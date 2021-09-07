const Discord = require('discord.js');

module.exports = {
    name: "usettings",
    aliases: ["ust"],
    category : "Uno",
    description : "Change the UNO settingss",
    usage: "[command]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
    run: async(client, message, args) => {
        await client.discordUNO.updateSettings(message);
    }
}
