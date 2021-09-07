const Discord = require('discord.js');

module.exports = {
    name: "ucards",
    aliases: ["uc"],
    category : "Uno",
    description : "To view your cards in your hand.",
    usage: "[command]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
    run: async(client, message, args) => {
        await client.discordUNO.viewCards(message);
    }
}
