const Discord = require('discord.js');

module.exports = {
    name: "uviewwinners",
    aliases: ["uvw"],
    category : "Uno",
    description : "see the winner",
    usage: "[command]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
    run: async(client, message, args) => {
        await client.discordUNO.viewWinners(message);
    }
}
