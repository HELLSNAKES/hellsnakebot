const Discord = require('discord.js');

module.exports = {
    name: "uviewsettings",
    aliases: ["uvst"],
    category : "Uno",
    description : "see your settings",
    usage: "[command]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
    run: async(client, message, args) => {
        await client.discordUNO.viewSettings(message);
    }
}
