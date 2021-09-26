const Discord = require('discord.js');

module.exports = {
    name: "shuffle",
    category: "Music",
    description: "Shuffle the guild queue songs",
    timeout: 3000,
    usage: "[command]",
    author: "[Harmonynos Team]",
    run : async(client, message, args) => {
        if(!message.member.voice.channel) 
        return message.reply('Please join a voice channel!');
        await client.distube.shuffle(message)
        await message.react('🔀');
    }
}
