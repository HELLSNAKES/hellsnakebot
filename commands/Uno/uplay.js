const Discord = require('discord.js');

module.exports = {
    name: "uplay",
    aliases: ["upl"],
    category : "Uno",
    description : "Play a card in your hand.",
    usage: "[command]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
    run: async(client, message, args) => {
        await client.discordUNO.playCard(message);
    }
}
