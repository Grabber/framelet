'use strict';

import namespace from './namespace';

import { nanoid } from 'nanoid';

import { invariant,
         registerEventListener,
         unregisterEventListener } from './utils';

export default (signature, target, origin = '*') => {
   let event_listener = null;
   let listeners = [];

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
      if (listeners.length === 0 && event_listener) {
         unregisterEventListener(event_listener);
         event_listener = null;
      }
   };

   const eventListener = () => {
      return e => {
         const { topic: _topic, message, signature: _signature } = decode(e.data);

         if (_signature === signature) {
            for (let i = 0; i < listeners.length; i += 1) {
               const { topic, cb, once } = listeners[i];

               if (namespace(topic).match(_topic)) {
                  if (once) {
                     listeners.splice(i, 1);

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
      if (listeners.length === 0) {
         event_listener = eventListener();
         registerEventListener(event_listener);
      }

      listeners.push({
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
         listeners = [];
      } else {
         for (let i = 0; i < listeners.length; i += 1) {
            const { topic: t, cb: c } = listeners[i];

            if (t === topic && c === cb) {
               listeners.splice(i, 1);

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

   const listener = () => { return event_listener; }

   return {
      listener,
      listeners,
      off,
      on,
      once,
      send,
   }
}