# post-messenger



/**
 * const pm = Messenger('project', window.parent);
 *
 * // listen channel
 * pm.on('channel', message => { });
 *
 * // listen channel
 * pm.once('channel_once', message => { });
 *
 * // send message to window.parent
 * pm.send('channel', 'Hello world');
 *
 * pm.off(channel, func); // cancel listen
 */

> A simple wrapper of `window.postMessage` for cross-document communication with each other.
>
> 一个简单的 `window.postMessage` 封装，用于跨文档的双向数据通信。

[![Build Status](https://travis-ci.org/hustcc/post-messenger.svg?branch=master)](https://travis-ci.org/hustcc/post-messenger)
[![Coverage Status](https://coveralls.io/repos/github/hustcc/post-messenger/badge.svg?branch=master)](https://coveralls.io/github/hustcc/post-messenger?branch=master)
[![npm](https://img.shields.io/npm/v/post-messenger.svg)](https://www.npmjs.com/package/post-messenger)
[![npm](https://img.shields.io/npm/dm/post-messenger.svg)](https://www.npmjs.com/package/post-messenger)
[![gzip](http://img.badgesize.io/https://unpkg.com/post-messenger/dist/post-messenger.min.js?compression=gzip)](https://unpkg.com/post-messenger/dist/post-messenger.min.js)



## Feature

 - Simple wrapper for `postMessage`.
 - Use it just like `event emitter`.
 - Event channel `namespace` supported.



## Install


> npm i --save post-messenger

or import it by `script` in HTML, then get `PostMessenger` on window.

```html
<script src="https://unpkg.com/post-messenger/dist/post-messenger.min.js"></script>
```



## Usage


 - In `parent` document.

```js
import PostMessenger from 'post-messenger';

// connect to iframe
const pm = PostMessenger('chat', window.iframe_name.contentWindow);

const listener = message => {
  console.log(message);
}

// listen the messages
pm.once('room1.*', listener);

pm.on('room1.user1', listener);
```


 - In `iframe` document.

```js
import PostMessenger from 'post-messenger';

// connect to parent
const pm = PostMessenger('chat', window.parent);

const listener = message => {
  console.log(message);
}

// send messages
pm.send('room1', 'All users of room1 will received.');

pm.send('*', 'broadcast message.');
```

Full example can be found [here](https://git.hust.cc/post-messenger/demo/), and code [here](demo).



## API


There is only one function named `PostMessenger`, you can get the instance by:

```js
// projectId: the unique id of communication.
// targetDocument: the document which you want to connect and communicate.
const pm = PostMessenger(projectId, targetContentWindow);
```

The instance has 4 apis.

 - **pm.once(channel, listener)**

Add a message listener on channel for once.

 - **pm.on(channel, listener)**

Add a message listener on channel.

 - **pm.off([channel, listener])**

Remove listener, if `channel` and `listener` are all `undefined`, remove all.

 - **pm.send(channel, message)**

Send a message to the channel.



# Scenes

> The `window.postMessage()` method safely enables cross-origin communication between Window objects; e.g., between a page and a pop-up that it spawned, or between a page and an iframe embedded within it.

The communicate target can be:

 - Window.open
 - Window.opener
 - HTMLIFrameElement.contentWindow
 - Window.parent
 - Window.frames

Reference [here](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage).


# License

MIT@[hustcc](https://github.com/hustcc).
