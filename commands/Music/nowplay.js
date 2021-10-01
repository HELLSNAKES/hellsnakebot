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
        if (!message.member.voice.channel)
            return message.reply('Please join a voice channel!')
        const queue = client.distube.getQueue(message)
        if (!queue) {
            return message.reply(`There are currently no songs`);
        }
        const song = queue.songs[0]
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle('<:headphones:879518595602841630> Now Playing')
            .setDescription(`[${song.name}](${song.url})`)
            .addField('**Views:**', song.views.toString())
            .addField('<:like:879371469132562552>', song.likes.toString())
            .addField('<:dislike:879371468817973299>', song.dislikes.toString())
            .setThumbnail(song.thumbnail)
            .addField('**Duration:**', `${queue.formattedCurrentTime} / ${song.formattedDuration}`)
            .addField('**Filter:**', queue.filter || "OFF")
            .addField('**Autoplay:**', `${queue.autoplay ? "On" : "Off"}`)
            .addField('**Volume:**', `${queue.volume}%`)
            .addField('***Requested by***:', song.user.toString())
        message.channel.send(embed)
    }
}
