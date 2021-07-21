const Discord = require('discord.js');

module.exports = {
    name: "stop",
    aliases: ["st"],
    category: "Music",
    description: "stops playing a song!",
    timeout: 3000,
    usage: "[command]",
    run : async(client, message, args) => {
        if(!message.member.voice.channel) 
        return message.reply('Please join a voice channel!');
        await client.distube.stop(message)
        await message.channel.send("**Stopped Playing!**")
    }
}