const Discord = require("discord.js");
const filters = [
    "3d",
    "bassboost",
    "echo",
    "karaoke",
    "nightcore",
    "vaporwave",
    "flanger",
    "gate",
    "haas",
    "reverse",
    "surround",
    "mcompand",
    "phaser",
    "tremolo",
    "earwax"
]
module.exports = {
    name: "filter",
    category: "Music",
    description: "Changes the audio Filter",
    timeout: 3000,
    usage: "[command]",
    author: "[Harmonynos Team]",
    run: async (client, message, args) => {
        if (!message.member.voice.channel)
            return message.reply('Please join a voice channel!')
        if (filters.includes(args[0])) {
            const filter = client.distube.setFilter(message, args[0]);
            await message.react('👌')
            if (filter) {
                return message.reply(`Added filter \`${filter}\``);
            } else {
                return message.reply(`Filter turned off`);
            }
        } else {
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`***Audio Filters***\n\`${filters.join(', ')}\` \n\nUsage \`[Command] + <filter name>\` to toggle a filter`)
            message.channel.send(embed)
        }
    }
}
