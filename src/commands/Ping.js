
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