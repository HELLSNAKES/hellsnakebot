const Discord = require('discord.js');

module.exports = {
    name: "udraw",
    aliases: ["ud"],
    category : "Uno",
    description : "draw card",
    usage: "[command]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
    run: async(client, message, args) => {
        await client.discordUNO.draw(message);
    }
}
