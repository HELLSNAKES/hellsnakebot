const Discord = require('discord.js');

module.exports = {
    name: "play",
    aliases: ["pl"],
    category: "Music",
    description: "play a song!",
    timeout: 3000,
    usage: "[command]+[url] or [song name]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
    run : async(client, message, args) => {
        if(!message.member.voice.channel) 
        return message.reply('Please join a voice channel!');
        const music = args.join(" "); 
        if(!music) return message.reply("Please provide a song!");
        await client.distube.play(message, music)
    }
}