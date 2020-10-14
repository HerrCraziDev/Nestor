
const fs = require('fs');


class CommandsHandler {
    _commands = []

    constructor(client, config) {
        this.client = client;
        this.config = config;
    }

    addCommand(command) {
        this._commands.push(command.name);
        this[command.name] = command;
    }

    deleteCommand(commandName) {
        if (this._commands.indexOf(commandName) != -1) {
            this._commands = this._commands.filter(c => c != commandName);

            delete this[commandName];
        }
    }

    load(path) {
        // Temporarily desactivated. Must check at this file's path instead of runtime path.
        if (fs.existsSync(path) || true) {
            try {
                const Command = require(path);
                let command = new Command(this.client);

                this._commands.push(command.name);
                this[command.name] = command;

                console.log(`[CommandsHandler] Loaded command ${command.name}`);
            } catch (error) {
                console.error(error);
            }
        } else {
            console.error(`[CommandsHandler] Cannot import command : file ${path} does not exists.`);
        }
    }

    list() {
        return this._commands;
    }

    has(commandName) {
        return (this._commands.indexOf(commandName) != -1 && this.hasOwnProperty(commandName));
    }

    // listAvailable() { }

    get(commandName) {
        if (this.commands.indexOf(commandName) != -1) return this[commandName];
        else return null;
    }

    trigger(command, context, ...args) {
        if (this.commands.indexOf(commandName) != -1) this[command].execute(context, ...args);
    }
};

module.exports = CommandsHandler;