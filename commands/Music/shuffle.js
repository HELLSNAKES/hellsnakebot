const Discord = require('discord.js');

module.exports = {
    name: "shuffle",
    category: "Music",
    description: "Shuffle the guild queue songs",
    timeout: 3000,
    usage: "[command]",
    author: "[Harmonynos Team]",
    run: async (client, message, args) => {
        if (!message.member.voice.channel)
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
        await client.distube.shuffle(message)
        await message.react('🔀');
    }
}
