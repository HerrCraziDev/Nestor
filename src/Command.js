
class Command {
    name = "stub"
    abstract = "Command stub for all commands"
    description = "This is not a real command, but rather a stub used as an interface for all other commands"
    version = "1.0"
    usage = "Not to be used"
    hidden = true
    admin = false

    constructor(client) {
        this.client = client;
    }

    execute(context, ...args) {
        throw "Implementation error : Must override Command.execute() virtual public method.";
    }
};

module.exports = Command;