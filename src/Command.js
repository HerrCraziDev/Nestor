/**
 * @interface Command
 * @classdesc Base (virtual) class for all Commands. All commands must inherit
 * from this class; which is a stub.
 * 
 * @author HerrCraziDev <herrcrazi@gmail.com>
 */

class Command {
    name = "stub"
    abstract = "Command stub for all commands"
    description = "This is not a real command, but rather a stub used as an interface for all other commands"
    version = "1.0"
    usage = "Not to be used"
    hidden = true
    admin = false

    constructor(client, config) {
        //Generic constuctor ; client could not be there.
        this.client = client;
        this.config = config;
    }

    execute(context, ...args) {
        throw "Implementation error : Must override Command.execute() virtual public method.";
    }
};

module.exports = Command;