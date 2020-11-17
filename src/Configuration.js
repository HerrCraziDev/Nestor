/**
 * @class Configuration
 * @classdesc Manages a common configuration tree for the whole bot, allowing specific configurations
 * for each guild, and saving modifications to the configuration tree on disk for 
 * persistency.
 * 
 * @author HerrCraziDev <herrcrazi@gmail.com>
 */

const fs = require('fs');


class Configuration {
    bot = {}            // The bot's configuration (prefixes and stuff)
    config = {}         // Generic configuration
    guilds = []         // Guild-specific configuration
    basePath = ''       // Path towards the main config JSON0
    guildsPath = ''     // Path towards the directory containing all guilds confs if used

    constructor(base = "./config/conf.json", guilds = "./config/guilds/") {
        this.basePath = base;
        this.guildsPath = guilds;

        this.reload()
    }

    reload() {
        let base = require(this.basePath);

        this.bot = base.bot;
        this.config = baes.config;
        if (base.config.separateGuildsConfig) {
            this.guildsPath = base.config.guildsConfigPath || this.guildsPath;
            this.guilds = require(this.guildsPath);
        } else {
            this.guilds = base.guilds;
        }
    }

    save() {
        let data = {
            bot: this.bot
        };

        if (data)
        fs.writeFile(this.basePath)
    }
}

module.exports = Configuration;