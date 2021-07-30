const Discord = require('discord.js');

module.exports = {
    name: "leave",
    category: "Music",
	description: "leave voice channel",
    timeout: 3000,
    usage: "[command]",
    run: async(client, message, args) => {
        const voiceChannel = message.member.voice.channel
        if (!voiceChannel) 
        return message.channel.send("Im Not In A Voice Channel")
        try {
            voiceChannel.leave()
        } catch(error) {
            return message.channel.send(`There Was An Error Disconnecting To The Voice Channel: ${error}`)
        }
    }
}