export const postMessageSupported = () => typeof window !== 'undefined' && !!window.postMessage;

export const invariant = (condition, msg) => {
   if (!condition) {
      throw new Error(msg);
   }
};

export const listen = listener => {
   postMessageSupported() && window.addEventListener('message', listener, false);
};

export const unListen = listener => {
   postMessageSupported() && window.removeEventListener('message', listener, false);
};