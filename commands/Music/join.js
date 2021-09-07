const Discord = require('discord.js');

module.exports = {
    name: "join",
    category: "Music",
	description: "join voice channel",
    timeout: 3000,
    usage: "[command]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
    run: async(client, message, args) => {
        const voiceChannel = message.member.voice.channel
        if (!voiceChannel) 
        return message.channel.send("You Are Not In a Voice Channel!")
        try {
            await voiceChannel.join().then(connection => {
                connection.voice.setSelfDeaf(true)
            })
        } catch(error) {
            return message.channel.send(`There Was An Error Connecting To The Voice Channel: ${error}`)
        }
    }
}