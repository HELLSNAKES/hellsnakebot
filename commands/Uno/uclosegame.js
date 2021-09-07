const Discord = require('discord.js');

module.exports = {
    name: "uclosegame",
    aliases: ["ucls"],
    category : "Uno",
    description : "close the game",
    usage: "[command]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
    run: async(client, message, args) => {
        await client.discordUNO.closeGame(message);
    }
}
