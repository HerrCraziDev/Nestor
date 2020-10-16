#!/usr/bin/node

const Bot = require('./src/Bot');
const tokens = require('./config/tokens.json');
const config = require('./config/conf.json');


let Nestor = new Bot(tokens.discordAPI, config);

Nestor.commands.load("./commands/Ping.js");
Nestor.commands.load("./commands/Parrot.js");
Nestor.commands.load("./commands/Roles.js");
console.log(Nestor.commands.list());


Nestor.start();
