'use strict';

import namespace from './namespace';

import { registerEventListener, unregisterEventListener, invariant } from './utils';

export default (project, target, origin = '*') => {
   let channels = [];
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
      if (channels.length === 0 && listener) {
         unregisterEventListener(listener);

         listener = null;
      }
   };

   const listenerEntry = () => {
      return e => {
         const { channel: msg_channel, message, project: msg_project } = decode(e.data);

         if (msg_project === project) {
            for (let i = 0; i < channels.length; i += 1) {
               const { ch, cb, once } = channels[i];

               if (namespace(ch).match(msg_channel)) {
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

   const on = (ch, cb, once = false) => {
      if (channels.length === 0) {
         listener = listenerEntry();

         registerEventListener(listener);
      }

      channels.push({
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
         channels = [];
      } else {
         for (let i = 0; i < channels.length; i += 1) {
            const { ch: h, cb: b } = channels[i];

            if (h === ch && b === cb) {
               channels.splice(i, 1);

               i -= 1;
            }
         }
      }

      check();
   };

   const send = (ch, message) => {
      invariant(target && target.postMessage, '`target` can\'t call `postMessage` function');

      target.postMessage(
         encode(ch, message),
         origin
      );
   };

   return {
      listener,
      channels,
      off,
      on,
      once,
      send,
   }
}