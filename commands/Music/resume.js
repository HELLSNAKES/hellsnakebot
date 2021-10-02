const Discord = require('discord.js');

module.exports = {
    name: "resume",
    aliases: ["rs"],
    category: "Music",
    description: "resume playing a song!",
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
        await client.distube.resume(message)
        await client.distube.pause(message)
        await client.distube.resume(message)
        await message.react('▶');
    }
}