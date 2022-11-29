const path = require("path");
const fs = require("fs");
const fsPromises = fs.promises;

const onlineUsers = [
    {
        name: 'Test1',
        age: 21,
        city: 'Lviv'
    },
    {
        name: 'Test2',
        age: 22,
        city: 'Kyiv'
    },
    {
        name: 'Test3',
        age: 23,
        city: 'Odesa'
    },
    {
        name: 'Test4',
        age: 24,
        city: 'Charkiv'
    }
];
const inPersonUsers = [
    {
        name: 'Test5',
        age: 25,
        city: 'Lviv'
    },
    {
        name: 'Test6',
        age: 26,
        city: 'Kyiv'
    },
    {
        name: 'Test7',
        age: 27,
        city: 'Odesa'
    },
    {
        name: 'Test8',
        age: 28,
        city: 'Charkiv'
    }
];
const mainPath = path.join(__dirname, 'main');

(async function () {
    await fsPromises.access(mainPath, fs.constants.R_OK)
        .catch(() => fsPromises.mkdir(mainPath));

    await Promise.all([
        fsPromises.mkdir(path.join(mainPath, 'inPerson'), {recursive: true}),
        fsPromises.mkdir(path.join(mainPath, 'online'), {recursive: true}),

        writeAndAppendFile('inPerson', inPersonUsers),
        writeAndAppendFile('online', onlineUsers)
    ]);
} ())

async function writeAndAppendFile(pathFolder, users) {
    const data = users.map(({name, age, city}) => `NAME: ${name}, AGE: ${age}, CITY: ${city}\n`);
    return await fsPromises.writeFile(path.join(mainPath, pathFolder, 'user.txt'), data);
}

async function swap(firstFolder, secondFolder) {
    const [dataFromFile1, dataFromFile2] = await Promise.all([
        fsPromises.readFile(path.join(mainPath, firstFolder, 'user.txt'), "utf8"),
        fsPromises.readFile(path.join(mainPath, secondFolder, 'user.txt'), "utf8")
    ]);

    await Promise.all([
        fsPromises.appendFile(path.join(mainPath, firstFolder, 'user.txt'), dataFromFile2, {flag: 'w'}),
        fsPromises.appendFile(path.join(mainPath, secondFolder, 'user.txt'), dataFromFile1, {flag: 'w'})
    ]);
}

swap('inPerson', 'online');