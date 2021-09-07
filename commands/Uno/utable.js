const Discord = require('discord.js');

module.exports = {
    name: "utable",
    aliases: ["utb"],
    category : "Uno",
    description : "see the status of the game",
    usage: "[command]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
    run: async(client, message, args) => {
        await client.discordUNO.viewTable(message);
    }
}
