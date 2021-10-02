const Discord = require('discord.js');

module.exports = {
    name: "skiptotime",
    aliases: ["seek"],
    category: "Music",
    description: "Set the playing time to another position",
    timeout: 3000,
    usage: "[command]",
    author: "[Harmonynos Team]",
    run: async (client, message, args) => {
        if (!message.member.voice.channel)
            return message.reply('Please join a voice channel!');
        let queue = client.distube.getQueue(message);
        if (!queue) {
            const queueError = new Discord.MessageEmbed()
                .setDescription("There is Nothing Playing")
                .setColor("RANDOM")
            return message.channel.send(queueError)
        }
        let time = parseInt(args[0]);
        if (!time) return message.reply("Please specify a time | Time in seconds.")
        if (time >= queue.songs[0].duration) return message.reply(`Time <  \`${queue.songs[0].duration} seconds\``)
        client.distube.seek(message, Number(args[0] * 1000));
        await message.react('⏩');
        message.reply(`Skip time to \`${args[0]} seconds\``);
    }
}
