const Discord = require('discord.js');

module.exports = {
    name: "skip",
    aliases: ["sk"],
    category: "Music",
    description: "skips the current song in the queue",
    timeout: 3000,
    usage: "[command]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
    run: async (client, message, args) => {
        if (!message.member.voice.channel)
            return message.reply('Please join a voice channel!');
        let queue = client.distube.getQueue(message);
        if (!queue) {
            const queueError = new Discord.MessageEmbed()
                .setDescription("There is Nothing Playing")
                .setColor("RANDOM")
            return message.channel.send(queueError)
        }
        await client.distube.skip(message)
        await message.react('⏭');
    }
}