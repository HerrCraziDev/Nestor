
const Discord = require('discord.js');
const CommandsHandler = require('./CommandsHandler');
const { throws } = require('assert');

const defaultConf = {
    version: "1.0.0",
    name: "default",
    bot: {
        prefix: '!',
        roles: []
    },
    admin: {
        allow: true,
        prefix: '@',
        roles: []
    },
    guilds: []
}


class Bot {
    config = {}
    token = ''
    name = ''
    version = ''

    client = {}


    constructor( token, config ) {
        this.config = {...defaultConf, ...config};
        this.version = config.version || defaultConf.version;
        this.name = config.name || defaultConf.name;
        
        if ( !token || typeof token != 'string' ) throw `${__filename} : No API token provided.`;
        else this.token = token;

        this.client = new Discord.Client();
        this.commands = new CommandsHandler(this.client, this.config);
    }

    parse(message) {
        console.log(`New message : ${message.content}`);

        if ( !message.author.bot && message.content.startsWith(this.config.bot.prefix) ) {

            let args = message.content.split(/ +/);
            let command = args[0].replace(this.config.bot.prefix, '');

            if ( this.commands.has(command) ) {
                this.commands[command].execute({ message }, ...args);
            } else {
                console.error(`Unknown command ${command} in message ${message.content}`);
            }
        }
    }
    
    onStart() {}

    onMessage() {}

    start() {
        console.log(`[${this.name}] Bot started with configuration :`);
        console.log(this.config);

        this.client.once('ready', () => {
            console.log(`[${this.name}] Logged in as ${this.client.user.tag}`);
            this.client.user.setActivity("the world collapse", {type: 'WATCHING'});
        });

        this.client.on('message', message => this.parse(message));

        this.client.login(this.token);
    }
};

module.exports = Bot;