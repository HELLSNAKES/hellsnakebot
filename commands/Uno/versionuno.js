const Discord = require('discord.js');

module.exports = {
    name: "versionuno",
    aliases: ["uv"],
    category : "Uno",
    description : "check version",
    usage: "[command]",
    run: async(client, message, args) => {
        await client.discordUNO.version.updates(message);
    }
}
