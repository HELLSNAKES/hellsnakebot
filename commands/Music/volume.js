const Discord = require('discord.js');
const progressbar = require('string-progressbar');

module.exports = {
    name: "volume",
    category : "Music",
    aliases : ['v'],
    description : "Change the music player's volume.",
    timeout: 3000,
    usage: '[command]+[amount]',
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
    run: async(client, message, args) => {
        if(!message.member.voice.channel)
         return message.reply('Please join a voice channel!')
        let amount = parseInt(args[0]);
        if(!amount) return message.channel.send("Please specify a volume.")
        if(amount > 100) {
            message.channel.send("Please enter a valid number (between 1 and 100)")
        } else {
            client.distube.setVolume(message, amount);
            var total = 100;
            var current = amount;
            let bar = progressbar.splitBar(total, current, 27, "▬", "🔘")[0];
            message.channel.send(`Set the new volume to ${amount}%.`);
            message.channel.send(bar);
        }
    }
}
