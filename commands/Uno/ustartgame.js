const Discord = require('discord.js');

module.exports = {
    name: "ustartgame",
    aliases: ["ustr"],
    category : "Uno",
    description : "start uno game",
    usage: "[command]",
    run: async(client, message, args) => {
        await client.discordUNO.startGame(message);
    }
  }
