/**
 * @class Roles
 * @implements {Command}
 * @classdesc A command for managing self-roles, attributed by the user himself
 * upon invoking the command or reacting to a message bound to the command with
 * a reaction bound to a configured role.
 * 
 * @author HerrCraziDev <herrcrazi@gmail.com>
 */


const Command = require('../Command');

class Roles extends Command {
    name = "roles"
    abstract = "Self-attributed roles manager"
    description = "Allows you to claim or remove self-attributed roles. These roles are configured by the server's staff."
    version = "1.0"
    usage = "get <role>|remove <role>|list [all|mine]"
    hidden = false
    admin = false

    constructor(client, config) {
        super(client, config);

        this.client.on('messageReactionAdd', this.onReaction);
    }

    async onReaction(reaction, user) {
        if (reaction.partial) await reaction.fetch();
        if (reaction.message.partial) await reaction.fetch();

        console.log("New reaction on message", reaction);
        
    }

    async give(user, roleName) {
        let guild = user.guild;
        let role = guild.roles.cache.find(r => r.name === roleName);

        if (role) {
            if ( !user.roles.cache.has(role.id) ) {
                console.log("Trying to give the role " + role.name, role);
                await user.roles.add(role);
                return true;
            } else throw new Error(`:ballot_box_with_check: You already have that role. Pretty based, eh chad?`);
        }
        else throw new Error(`:x: Whoops! I've searched far and wide and there's no such role in this server!`);
    }

    async remove(user, roleName) {
        let guild = user.guild;
        let role = guild.roles.cache.find(r => r.name === roleName);

        if (role) {
            if ( user.roles.cache.has(role.id) ) {
                await user.roles.remove(role);
                return true;
            }
            else throw new Error(`:x: Seems you don't have that role in the first place.`);
        }
        else throw new Error(`:x: Whoops! I've searched far and wide and there's no such role in this server!`);
    }

    listRoles(user) {
        return user.roles.cache.filter(r => r.name !== user.guild.roles.everyone.name); //TODO: filter by managed roles only
    }

    listAll(guild) {
        return guild.roles.cache.filter(r => r.name !== user.guild.roles.everyone.name);
    }

    printUsage() {
        return `*Command **${this.name}** - ${this.classdesc}*
            ${this.description}
            __Usage :__ \`${this.config.prefix}${this.name} ${this.usage}\`
        `;
    }

    async execute(context, ...args) {
        let message = context.message;
        let user = context.message.member;
        let guild = context.message.guild;

        console.log(`User ${user.displayName} (${message.author.tag}) has roles :`)
        guild.roles.cache.forEach(role => {
            console.log(role.name)
        });
        
        let roleName = args[2]; //TODO :support multi-word role names

        try {
            switch (args[1]) {
                case 'get':
                    await this.give(user, roleName);
                    message.channel.send(`Here is your ${roleName} role, Sir.`);
                    break;
                
                case 'remove':
                    await this.remove(user, roleName);
                    message.channel.send(`You no longer have the ${roleName} role, Sir.`);
                    break;
                
                case 'list':
                    let roles = "";
                    this.listRoles(user).forEach(r => roles += `- <@&${r.id}>\n`);
                    message.channel.send(`**Here are your roles :**\n${roles}`);
                    break;
            
                default:
                    console.log(this)
                    message.channel.send(`\n:x: **Sorry, can't do that**\nAction \`${args[1]}\` does not exist.\n\n__Here is how to use the Roles command :__\n${this.printUsage()}`);
                    break;
            }
        } catch (e) {
            console.error(e);
            message.channel.send(e.message);
        }
    }
};

module.exports = Roles;