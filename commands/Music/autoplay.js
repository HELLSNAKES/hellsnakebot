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
        let queue = client.distube.getQueue(message);
        if (message.member.guild.me.voice.channel.id !== message.member.voice.channel.id) {
            return message.reply('You are not on the same voice channel as me!');
        }
        if (!queue) {
            const queueError = new Discord.MessageEmbed()
            .setDescription("There is Nothing Playing")
            .setColor("RANDOM")
            return message.channel.send(queueError)
        }
		let mode = client.distube.toggleAutoplay(message);
		return message.reply("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
	}
}