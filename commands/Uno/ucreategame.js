const Discord = require('discord.js');

module.exports = {
    name: "ucreategame",
    aliases: ["ucr"],
    category : "Uno",
    description : "create uno game",
    usage: "[command]",
    run: async(client, message, args) => {
        await client.discordUNO.createGame(message);
    }
}
