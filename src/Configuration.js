/**
 * @class Configuration
 * @classdesc Manages a common configuration tree for the whole bot, allowing specific configurations
 * for each guild, and saving modifications to the configuration tree on disk for 
 * persistency.
 * 
 * @author HerrCraziDev <herrcrazi@gmail.com>
 */

const fs = require('fs');


const defaultConf = {
    version: "1.0.0",
    name: "Nestor",
    prefix: '!',
    admin: {
        allow: true,
        prefix: '@',
        roles: []
    },
    guilds: []
}


class Configuration {
    bot = {}            // The bot's configuration (prefixes and stuff)
    config = {}         // Generic configuration
    guilds = new Map([])// Guild-specific configuration
    configPath = ''       // Path towards the main config JSON
    guildsPath = ''     // Path towards the directory containing all guilds confs if used

    constructor(configPath) {
        this.configPath = configPath;

        this.reload()
    }

    loadGuilds(guildsPath) {
        let guildConfigFiles = fs.readdirSync(this.guildsPath);
        for (const file of guildConfigFiles) {
            if ( file.endsWith(".json") ) {
                let data = fs.readFileSync(guildsPath + file);
                this.guilds.set( data.id, JSON.parse(data, _reviver) );
                console.log(`[Configuration] Loaded guild config ${data.id} for '${data.name}`);
            }
        }
        console.log(`[Configuration] Loaded ${this.guilds.size} guilds.`);
    }

    reload() {
        let conf = require('../' + this.configPath);

        this.bot = { ...defaultConf, ...conf };
        this.guildsPath = this.bot.guildsConfigPath;
        console.log("[Configuration] Loaded config.");

        this.loadGuilds(this.guildsPath);
    }

    save() {
        fs.writeFile(this.configPath, JSON.stringify(this.bot), {}, () => {
            console.log("[Configuration] Config saved to disk.");
        });
    }

    saveAll() {
        this.save();

        for (const [guild, conf] of this.guilds) {
            this.saveGuild(guild);
        }
        console.log(`[Configuration] Saved ${this.guilds.size} guilds.`)
    }

    saveGuild(guildId) {
        if ( this.guilds.has(guildId) ) {
            fs.writeFile( this.guildsPath + guildId + ".json", JSON.stringify(this.guilds.get(guildId), _replacer) );
        }
    }

    get(guild) {
        if ( this.guilds.has(guild.id)) return this.guilds.get(guild.id);
        else return null;
    }

    
}

function _replacer(key, value) {
    const originalObject = this[key];
    if (originalObject instanceof Map) {
        return {
            dataType: 'Map',
            value: [...originalObject]
        };
    } else {
        return value;
    }
}

function _reviver(key, value) {
    if (typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map') {
            return new Map(value.value);
        }
    }
    return value;
}

module.exports = Configuration;