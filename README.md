# framelet

```
  ______                        _      _   
 |  ____|                      | |    | |  
 | |__ _ __ __ _ _ __ ___   ___| | ___| |_ 
 |  __| '__/ _` | '_ ` _ \ / _ \ |/ _ \ __|
 | |  | | | (_| | | | | | |  __/ |  __/ |_ 
 |_|  |_|  \__,_|_| |_| |_|\___|_|\___|\__|
 ```

## API


There is only one function named `Framelet`, you can get the instance by:

```js
const framelet = Framelet('<CHANNEL>', targetContentWindow);
```

### add a message listener on channel for once
```js
framelet.once('<TOPIC>', () => {});
```

### add a message listener on topic
```js
framelet.on('<TOPIC>', () => {});
```

### send a message to the topic
```js
framelet.send('<TOPIC>', '<MESSAGE>');
```

### if both topic and listener are undefined, remove all
```js
framelet.off(['<TOPIC>', () => {}]);
```

## EXAMPLE

### PARENT

```js
import Framelet from 'framelet';

const framelet = Framelet('<SIGNATURE>', window.iframe_name.contentWindow);

framelet.on('*', (message) => {
   console.log(message);
});

framelet.send('*', 'Hi from parent!');
```

### CHILD

```js
import Framelet from 'framelet';

const framelet = Framelet('<SIGNATURE>', window.parent);

framelet.on('*', (message) => {
   console.log(message);
});

framelet.send('*', 'Hi from child!');
```