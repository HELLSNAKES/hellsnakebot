const Discord = require('discord.js');

module.exports = {
    name: "uleave",
    aliases: ["ulv"],
    category : "Uno",
    description : "leave the game",
    usage: "[command]",
    run: async(client, message, args) => {
        await client.discordUNO.removeUser(message);
    }
}
