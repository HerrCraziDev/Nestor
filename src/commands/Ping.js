/**
 * @class Ping
 * @implements {Command}
 * @classdesc A simple Ping command, which answers "pong" to the user.
 * 
 * @author HerrCraziDev <herrcrazi@gmail.com>
 */

const Command = require('../Command');

class Ping extends Command {
    name = "ping"
    abstract = "Basic Ping command. Responds with 'pong'."
    description = "Responds with Pong"
    version = "1.0"
    usage = ""
    hidden = false
    admin = false

    execute(context, ...args) {
        let message = context.message;
        message.channel.send("Pong !");
    }
};

module.exports = Ping;