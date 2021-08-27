const Discord = require('discord.js');

module.exports = {
    name: "usettings",
    aliases: ["ust"],
    category : "Uno",
    description : "Change the UNO settingss",
    usage: "[command]",
    run: async(client, message, args) => {
        await client.discordUNO.updateSettings(message);
    }
}
