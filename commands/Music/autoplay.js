const Discord = require('discord.js');

module.exports = {
	name: "autoplay",
    aliases: ["ap"],
    category: "Music",
	description: "Enable or disable autoplay",
    timeout: 3000,
    usage: "[command]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
    run : async(client, message, args) => {
		if(!message.member.voice.channel) 
        return message.reply('Please join a voice channel!');
		let mode = client.distube.toggleAutoplay(message);
		return message.reply("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
	}
}