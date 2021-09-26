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
        if (!message.member.voice.channel) {
            return message.reply('Please join a voice channel!');
        }
        let queue = client.distube.getQueue(message);
        if (!queue) {
            return message.reply(`There are currently no songs`);
        }
        let time = parseInt(args[0]);
        if(!time) return message.reply("Please specify a time | Time in seconds.")
        client.distube.seek(message, Number(args[0] * 1000));
        await message.react('⏩');
        message.reply(`Skip time to \`${args[0]} seconds\``);
    }
}
