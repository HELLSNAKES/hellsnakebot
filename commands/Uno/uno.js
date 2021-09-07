const Discord = require('discord.js');

module.exports = {
    name: "uno",
    category : "Uno",
    description : "Call the UNO!",
    usage: "[command]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
    run: async(client, message, args) => {
        await client.discordUNO.UNO(message);
    }
}
