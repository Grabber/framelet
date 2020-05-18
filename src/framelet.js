'use strict';

import namespace from './namespace';

import { invariant,
         registerEventListener,
         unregisterEventListener } from './utils';

export default (signature, target, origin = '*') => {
   let _listener = null;
   let _listeners = [];

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
      if (_listeners.length === 0 && _listener) {
         unregisterEventListener(_listener);
         _listener = null;
      }
   };

   const eventListener = () => {
      return e => {
         const { topic: _topic, message, signature: _signature } = decode(e.data);

         if (_signature === signature) {
            for (let i = 0; i < _listeners.length; i += 1) {
               const { topic, cb, once } = _listeners[i];

               if (namespace(topic).match(_topic)) {
                  if (once) {
                     _listeners.splice(i, 1);

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
      if (_listeners.length === 0) {
         _listener = eventListener();
         registerEventListener(_listener);
      }

      _listeners.push({
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
         _listeners = [];
      } else {
         for (let i = 0; i < _listeners.length; i += 1) {
            const { topic: t, cb: c } = _listeners[i];

            if (t === topic && c === cb) {
               _listeners.splice(i, 1);

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
      off,
      on,
      once,
      send,
   }
}