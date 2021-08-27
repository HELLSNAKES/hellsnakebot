const Discord = require('discord.js');

module.exports = {
    name: "uviewwinners",
    aliases: ["uvw"],
    category : "Uno",
    description : "see the winner",
    usage: "[command]",
    run: async(client, message, args) => {
        await client.discordUNO.viewWinners(message);
    }
}
