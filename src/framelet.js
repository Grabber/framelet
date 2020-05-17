'use strict';

import namespace from './namespace';

import { registerEventListener, unregisterEventListener, invariant } from './utils';

class Framelet {
   constructor(namespace, target, origin = '*') {
      let channels = [];
      let event_listener = null;
      let child = target;
   }

   encode(topic, message) {
      return JSON.stringify({
         message,
         namespace,
         topic,
      });
   }

   decode(message) {
      let m = {};

      try {
         m = JSON.parse(message);
      } catch (e) {
      }

      return m;
   }

   check() {
      if (channels.length === 0 && event_listener) {
         unregisterEventListener(event_listener);

         event_listener = null;
      }
   }

   listenerEntry() {
      return e => {
         const { topic: msg_topic, message, namespace: msg_namespace } = decode(e.data);

         if (msg_namespace === namespace) {
            for (let i = 0; i < channels.length; i += 1) {
               const { ch, cb, once } = channels[i];

               if (namespace(ch).match(msg_topic)) {
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
   }

   on(ch, cb, once = false) {
      if (channels.length === 0) {
         event_listener = listenerEntry();

         registerEventListener(event_listener);
      }

      channels.push({
         ch,
         cb,
         once,
      });
   }

   once(ch, cb) {
      on(ch, cb, true);
   }

   off(ch, cb) {
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
   }

   send(ch, message) {
      invariant(target && target.postMessage, '`target` can\'t invoke `postMessage`');

      target.postMessage(
         encode(ch, message),
         origin
      );
   }

   listener() { return event_listener }
}

export default new Framelet();