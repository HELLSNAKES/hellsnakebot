const Discord = require('discord.js');

module.exports = {
    name: "uplay",
    aliases: ["upl"],
    category : "Uno",
    description : "Play a card in your hand.",
    usage: "[command]",
    run: async(client, message, args) => {
        await client.discordUNO.playCard(message);
    }
}
