const Discord = require('discord.js');

module.exports = {
    name: "ucards",
    aliases: ["uc"],
    category : "Uno",
    description : "To view your cards in your hand.",
    usage: "[command]",
    run: async(client, message, args) => {
        await client.discordUNO.viewCards(message);
    }
}
