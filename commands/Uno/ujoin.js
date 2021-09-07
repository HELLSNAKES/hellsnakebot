const Discord = require('discord.js');

module.exports = {
    name: "ujoin",
    aliases: ["uj"],
    category : "Uno",
    description : "joingame",
    usage: "[command]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
    run: async(client, message, args) => {
        await client.discordUNO.addUser(message);
    }
}
