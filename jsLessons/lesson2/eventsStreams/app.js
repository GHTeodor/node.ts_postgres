const {EventEmitter} = require("events");
const fs = require("fs");
const path = require("path");

const ee = new EventEmitter();

ee.once('Log', (name) => console.log('Log is working!!!' + name));
ee.on('Log1', () => ee.emit('Log'));

ee.emit('Log1', "Oleg");

console.log(ee.eventNames());

const readStream = fs.createReadStream(path.join(__dirname, 'test.txt'));
const writeStream = fs.createWriteStream(path.join(__dirname, 'NEWtest.txt'));

// readStream.once('data', (chunk) => {
//
//     writeStream.write(chunk, (err) => {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//     });
//     writeStream.end();
// });

readStream.pipe(writeStream);

