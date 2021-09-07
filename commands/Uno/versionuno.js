const Discord = require('discord.js');

module.exports = {
    name: "versionuno",
    aliases: ["uv"],
    category : "Uno",
    description : "check version",
    usage: "[command]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
    run: async(client, message, args) => {
        await client.discordUNO.version.updates(message);
    }
}
