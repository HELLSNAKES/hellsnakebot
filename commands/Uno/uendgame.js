const Discord = require('discord.js');

module.exports = {
    name: "uendgame",
    aliases: ["ue"],
    category : "Uno",
    description : "End the UNO game",
    usage: "[command]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
    run: async(client, message, args) => {
        await client.discordUNO.endGame(message);
    }
}
