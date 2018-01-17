# post-messenger

> A simple wrapper of window.postMessage for iframes.

[![npm](https://img.shields.io/npm/v/post-messenger.svg)](https://www.npmjs.com/package/post-messenger) [![Build Status](https://travis-ci.org/hustcc/post-messager.svg?branch=master)](https://travis-ci.org/hustcc/post-messager) [![Coverage Status](https://coveralls.io/repos/github/hustcc/post-messager/badge.svg?branch=master)](https://coveralls.io/github/hustcc/post-messager?branch=master)

## Install

> npm i --save post-messenger

or import it by `script` in HTML.


## Usage

Show you the demo code.

```js
import PostMessenger from 'post-messenger';

const messenger = new PostMessenger('uniqueId', window.iframe_name);

const listener = message => {
  console.log(message);
}
messenger.once('iframe1.*', listener);

messenger.on('iframe1.*', listener);

messenger.send('parent', 'Hello world.');

messenger.off('iframe1.*', listener);
```


## API

There is only one class named `PostMessenger`, you can get the instance by:

```js
// projectId is a unique id for namespance.
// targetDocument is parent window or the iframe which you want to send message.

const messenger = new PostMessenger(projectId, targetContentWindow);
```

The instance has 4 apis.

 - **messenger.once(channel, listener)**: add one message listener on channel for once.
 - **messenger.on(channel, listener)**: add one message listener on channel.
 - **messenger.off(channel, listener)**: remove listener, if channel and listener is undefined, remove all.
 - **messenger.send(channel, message)**: send one message to channel.


# License

MIT
