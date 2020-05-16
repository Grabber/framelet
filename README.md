# framelet

```
  ______                        _      _   
 |  ____|                      | |    | |  
 | |__ _ __ __ _ _ __ ___   ___| | ___| |_ 
 |  __| '__/ _` | '_ ` _ \ / _ \ |/ _ \ __|
 | |  | | | (_| | | | | | |  __/ |  __/ |_ 
 |_|  |_|  \__,_|_| |_| |_|\___|_|\___|\__|
 ```

## usage

### parent

```js
import Framelet from 'framelet';

// connect to iframe
const framelet = Framelet('chat', window.iframe_name.contentWindow);

const listener = message => {
  console.log(message);
}

// listen the messages
framelet.once('room1.*', listener);

framelet.on('room1.user1', listener);
```

### child

```js
import Framelet from 'framelet';

// connect to parent
const framelet = Framelet('chat', window.parent);

const listener = message => {
  console.log(message);
}

// send messages
framelet.send('room1', 'all users of room1 will received.');

framelet.send('*', 'broadcast message.');
```

## API


There is only one function named `Framelet`, you can get the instance by:

```js
// projectId: the unique id of communication.
// targetDocument: the document which you want to connect and communicate.
const pm = Framelet(projectId, targetContentWindow);
```

```

 - **pm.once(channel, listener)**

Add a message listener on channel for once.

 - **pm.on(channel, listener)**

Add a message listener on channel.

 - **pm.off([channel, listener])**

Remove listener, if `channel` and `listener` are all `undefined`, remove all.

 - **pm.send(channel, message)**

Send a message to the channel.

```