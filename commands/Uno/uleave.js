const Discord = require('discord.js');

module.exports = {
    name: "uleave",
    aliases: ["ulv"],
    category : "Uno",
    description : "leave the game",
    usage: "[command]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
    run: async(client, message, args) => {
        await client.discordUNO.removeUser(message);
    }
}
