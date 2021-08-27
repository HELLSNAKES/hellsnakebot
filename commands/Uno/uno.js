const Discord = require('discord.js');

module.exports = {
    name: "uno",
    category : "Uno",
    description : "Call the UNO!",
    usage: "[command]",
    run: async(client, message, args) => {
        await client.discordUNO.UNO(message);
    }
}
