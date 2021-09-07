const Discord = require('discord.js');

module.exports = {
    name: "ustartgame",
    aliases: ["ustr"],
    category : "Uno",
    description : "start uno game",
    usage: "[command]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
    run: async(client, message, args) => {
        await client.discordUNO.startGame(message);
    }
  }
