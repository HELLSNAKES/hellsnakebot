const Discord = require('discord.js');

module.exports = {
    name: "udraw",
    aliases: ["ud"],
    category : "Uno",
    description : "draw card",
    usage: "[command]",
    run: async(client, message, args) => {
        await client.discordUNO.draw(message);
    }
}
