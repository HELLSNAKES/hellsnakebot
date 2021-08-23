const Discord = require('discord.js');

module.exports = {
    name: "queue",
    aliases: ["q"],
    category: "Music",
    description: "check queue",
    timeout: 3000,
    usage: "[command]",
    run : async(client, message, args) => {
        if(!message.member.voice.channel) 
        return message.reply('Please join a voice channel!');
        let queue = client.distube.getQueue(message);
        if (!queue) {
            const queueError = new Discord.MessageEmbed()
            .setDescription("There is Nothing Playing")
            .setColor("RANDOM")
            return message.channel.send(queueError)
        }
        let q = queue.songs.map((song, i) => {
            return `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``
        }).join("\n");

        const embed =  new Discord.MessageEmbed()
        .setDescription(`**Current queue: ** \n\n  ${q}`)
        .setColor("RANDOM")
        message.channel.send(embed)
    }
}