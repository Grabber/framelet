'use strict';

import namespace from './namespace';

import { registerEventListener, unregisterEventListener, invariant } from './utils';

export default (project, target, origin = '*') => {
   let listeners = [];
   let listener = null;

   const encode = (channel, message) => {
      return JSON.stringify({
         channel,
         message,
         project,
      });
   };

   const decode = message => {
      let m = {};

      try {
         m = JSON.parse(message);
      } catch (e) {
      }

      return m;
   };

   const check = () => {
      if (listeners.length === 0 && listener) {
         unregisterEventListener(listener);

         listener = null;
      }
   };

   const listenerEntry = () => {
      return e => {
         const { channel: msgChannel, message, project: msgProject } = decode(e.data);

         if (msgProject === project) {
            for (let i = 0; i < listeners.length; i += 1) {
               const { ch, cb, once } = listeners[i];

               if (namespace(ch).match(msgChannel)) {
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

   const on = (ch, cb, once = false) => {
      if (listeners.length === 0) {
         listener = listenerEntry();

         registerEventListener(listener);
      }

      listeners.push({
         ch,
         cb,
         once,
      });
   };

   const once = (ch, cb) => {
      on(ch, cb, true);
   };

   const off = (ch, cb) => {
      if (ch === undefined && cb === undefined) {
         listeners = [];
      } else {
         for (let i = 0; i < listeners.length; i += 1) {
            const { ch: h, cb: b } = listeners[i];

            if (h === ch && b === cb) {
               listeners.splice(i, 1);

               i -= 1;
            }
         }
      }

      check();
   };

   const send = (ch, message) => {
      invariant(target && target.postMessage, '`target` must have a callable `postMessage` function');

      target.postMessage(
         encode(ch, message),
         origin
      );
   };

   const get_listener = () => listener;

   return {
      get_listener,
      listeners,
      off,
      on,
      once,
      send,
   }
}