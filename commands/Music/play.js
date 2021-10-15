const Discord = require('discord.js');

module.exports = {
    name: "play",
    aliases: ["pl"],
    category: "Music",
    description: "play a song!",
    timeout: 3000,
    usage: "[command]+[url youtube|soundcloud] or [song name]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!message.member.voice.channel) {
            return message.reply('Please join a voice channel!');
        }
        if (queue)
            if (message.member.guild.me.voice.channel.id !== message.member.voice.channel.id) {
                return message.reply('You are not on the same voice channel as me!');
            }
        const music = args.join(" ");
        if (!music) return message.reply("Please provide a song!");
        await client.distube.play(message, music)
    }
}
