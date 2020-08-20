const EventEmitter = require('events');

class Emitter extends EventEmitter {}

const emitter = new Emitter();
const eventName = 'user:click';

emitter.on(eventName, click => {
  console.log('User clicked', click);
});

emitter.emit(eventName, 'Scrollbar');
emitter.emit(eventName, 'Ok Button');

let count = 0;

setInterval(() => {
  emitter.emit(eventName, `Ok button (${count++})`);
}, 1000);

// Events based on user's actions
const stdin = process.openStdin();
stdin.addListener('data', value => {
  console.log(`You tiped: ${value.toString().trim()}`);
})