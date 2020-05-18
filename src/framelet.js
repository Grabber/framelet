'use strict';

import namespace from './namespace';

import { nanoid } from 'nanoid';

import { invariant,
         registerEventListener,
         unregisterEventListener } from './utils';

export default (target, origin = '*') => {
   let channels = [];
   let event_listener = null;
   let signature = nanoid();

   const encode = (topic, message) => {
      return JSON.stringify({
         topic,
         message,
         signature,
      });
   };

   const decode = message => {
      let msg = {};

      try {
         msg = JSON.parse(message);
      } catch (e) {
      }

      return msg;
   };

   const check = () => {
      if (channels.length === 0 && event_listener) {
         unregisterEventListener(event_listener);
         event_listener = null;
      }
   };

   const eventListener = () => {
      return e => {
         const { topic: _topic, message, signature: _signature } = decode(e.data);

         if (_signature === signature) {
            for (let i = 0; i < channels.length; i += 1) {
               const { topic, cb, once } = channels[i];

               if (namespace(topic).match(_topic)) {
                  if (once) {
                     channels.splice(i, 1);

                     i -= 1;
                  }

                  cb(message, e);
               }
            }

            check();
         }
      }
   };

   const on = (topic, cb, once = false) => {
      if (channels.length === 0) {
         event_listener = eventListener();
         registerEventListener(event_listener);
      }

      channels.push({
         topic,
         cb,
         once,
      });
   };

   const once = (topic, cb) => {
      on(topic, cb, true);
   };

   const off = (topic, cb) => {
      if (topic === undefined && cb === undefined) {
         channels = [];
      } else {
         for (let i = 0; i < channels.length; i += 1) {
            const { topic: t, cb: c } = channels[i];

            if (t === topic && c === cb) {
               channels.splice(i, 1);

               i -= 1;
            }
         }
      }

      check();
   };

   const send = (topic, message) => {
      invariant(target && target.postMessage, '`target` can\'t call `postMessage` function');

      target.postMessage(
         encode(topic, message),
         origin
      );
   };

   return {
      channels,
      listener,
      off,
      on,
      once,
      send,
   }
}