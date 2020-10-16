const Command = require('../Command');

class Parrot extends Command {
    name = "parrot"
    abstract = "Repeats everything."
    description = "Repeats whatever you said when invoking the Parrot"
    version = "1.0"
    usage = "<whatever>"
    hidden = false
    admin = false

    execute(context, ...args) {
        let message = context.message;
        args.shift();
        message.channel.send(args.join(' '));
    }
};

module.exports = Parrot;