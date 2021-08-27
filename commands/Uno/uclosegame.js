const Discord = require('discord.js');

module.exports = {
    name: "uclosegame",
    aliases: ["ucls"],
    category : "Uno",
    description : "close the game",
    usage: "[command]",
    run: async(client, message, args) => {
        await client.discordUNO.closeGame(message);
    }
}
