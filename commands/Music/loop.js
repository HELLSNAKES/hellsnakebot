const Discord = require('discord.js');

module.exports = {
    name: "loop",
    aliases: ["rp"],
    category: "Music",
    description: "loops throught current song",
    timeout: 3000,
    usage: "[command]",
    run : async(client, message, args) => {
        if(!message.member.voice.channel) 
        return message.reply('Please join a voice channel!');
        await client.distube.setRepeatMode(message, parseInt(args[0]));
        await message.react('🔁');
    }
}