'use strict';

const wpm = () => typeof window !== 'undefined' && !!window.postMessage;

export const registerEventListener = listener => {
   wpm() && window.addEventListener('message', listener, false);
};

export const unregisterEventListener = listener => {
   wpm() && window.removeEventListener('message', listener, false); return null;
};

export const invariant = (condition, msg) => {
   if (!condition) {
      throw new Error(msg);
   }
};