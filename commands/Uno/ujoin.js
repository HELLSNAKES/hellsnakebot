const Discord = require('discord.js');

module.exports = {
    name: "ujoin",
    aliases: ["uj"],
    category : "Uno",
    description : "joingame",
    usage: "[command]",
    run: async(client, message, args) => {
        await client.discordUNO.addUser(message);
    }
}
