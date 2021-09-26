const Discord = require("discord.js");

module.exports = {
    name: "nowplay",
    aliases: ["np"],
    category: "Music",
    description: "Current song playing",
    timeout: 3000,
    usage: "[command]",
    author: "[Harmonynos Team]",
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message);
        if (!message.member.voice.channel)
            return message.reply('Please join a voice channel!')
        if (!queue) {
            return message.reply(`There are currently no songs`);
        }
        if (queue.songs.length) {
            const isPause = client.distube.isPaused(message);
            const embed = new Discord.MessageEmbed()
                .setTitle('<:headphones:879518595602841630> Now Playing')
                .setDescription(`[${queue.songs[0].name}](${queue.songs[0].url})`)
                .addField('**Duration:**', `${queue.formattedCurrentTime} / ${queue.songs[0].formattedDuration}`)
                .addField('**Filter:**', queue.filter || "OFF")
                .addField('***Requested by***:', queue.songs[0].user)
                .setColor("RANDOM")
            message.channel.send(embed)
        }
    }
}
