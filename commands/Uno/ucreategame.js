const Discord = require('discord.js');

module.exports = {
    name: "ucreategame",
    aliases: ["ucr"],
    category : "Uno",
    description : "create uno game",
    usage: "[command]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
    run: async(client, message, args) => {
        await client.discordUNO.createGame(message);
    }
}
