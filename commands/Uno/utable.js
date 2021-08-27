const Discord = require('discord.js');

module.exports = {
    name: "utable",
    aliases: ["utb"],
    category : "Uno",
    description : "see the status of the game",
    usage: "[command]",
    run: async(client, message, args) => {
        await client.discordUNO.viewTable(message);
    }
}
