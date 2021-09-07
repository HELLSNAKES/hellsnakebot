const Discord = require('discord.js');

module.exports = {
    name: "pause",
    aliases: ["ps"],
    category: "Music",
    description: "pause playing a song!",
    timeout: 3000,
    usage: "[command]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
    run : async(client, message, args) => {
        if(!message.member.voice.channel) 
        return message.reply('Please join a voice channel!');
        await client.distube.pause(message)
        await message.react('⏸');
    }
}