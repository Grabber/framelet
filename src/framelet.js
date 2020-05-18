'use strict';

import namespace from './namespace';

import { invariant,
         registerEventListener,
         unregisterEventListener } from './utils';

export default (context, target, origin = '*') => {
   let channels = [];
   let listener = null;

   const encode = (topic, message) => {
      return JSON.stringify({
         topic,
         message,
         context,
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
      if (channels.length === 0 && listener) {
         listener = unregisterEventListener(listener);
      }
   };

   const listenerEntry = () => {
      return e => {
         const { topic: _topic, message, context: _context } = decode(e.data);

         if (_context === context) {
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
         listener = listenerEntry();

         registerEventListener(listener);
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
      invariant(target && target.postMessage, '`postMessage` isn\'t supported');

      target.postMessage(
         encode(topic, message),
         origin
      );
   };

   return { off, on, once, send };
}