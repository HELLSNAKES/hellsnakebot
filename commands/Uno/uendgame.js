const Discord = require('discord.js');

module.exports = {
    name: "uendgame",
    aliases: ["ue"],
    category : "Uno",
    description : "End the UNO game",
    usage: "[command]",
    run: async(client, message, args) => {
        await client.discordUNO.endGame(message);
    }
}
