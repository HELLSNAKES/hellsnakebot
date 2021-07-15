const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "serverinfo",
    category: "Other",
    description: "Shows info about a server",
    timeout: 10000,
    usage: "[command]",
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL())
            .setColor('RANDOM')
            .setTitle(`${message.guild.name} Server stats`)
            .addFields(
                {
                    name: "🔰 Owner: ",
                    value: message.guild.owner.user.tag,
                    inline: true
                },
                {
                    name: "👥 Members: ",
                    value: `There are ${message.guild.memberCount} users!`,
                    inline: true
                },
                {
                    name: "👥 Members Online: ",
                    value: `There are ${message.guild.members.cache.filter(m => m.user.presence.status == "online").size} users online!`,
                    inline: true
                },
                {
                    name: "💻 Total Bots: ",
                    value: `There are ${message.guild.members.cache.filter(m => m.user.bot).size} bots!`,
                    inline: true
                },
                {
                    name: "🎈 Creation Date: ",
                    value: message.guild.createdAt.toLocaleDateString("en-us"),
                    inline: true
                },
                {
                    name: "✨ Roles Count: ",
                    value: `There are ${message.guild.roles.cache.size} roles in this server.`,
                    inline: true,
                },
                {
                    name: "✅ Verified: ",
                    value: message.guild.verified ? 'Server is verified' : `Server isn't verified`,
                    inline: true
                },
                {
                    name: "🗺 Region of server: ",
                    value: message.guild.region,
                    inline: true
                },
                {
                    name: "✈ Boosters: ",
                    value: message.guild.premiumSubscriptionCount >= 1 ? `There are ${message.guild.premiumSubscriptionCount} Boosters` : `There are no boosters`,
                    inline: true
                },
                {
                    name: "😀 Emojis: ",
                    value: message.guild.emojis.cache.size,
                    inline: true
                },
                {
                    name: "🎇 Animated Emoji: ",
                    value: message.guild.emojis.cache.filter(emoji => emoji.animated).size,
                    inline: true
                },
                {
                    name: "👨‍💼 Total Amount of Roles: ",
                    value: message.guild.roles.cache.size,
                    inline: true
                },
                {
                    name: "💬 Total Text Channels: ",
                    value: message.guild.channels.cache.filter(channel => channel.type === 'text').size,
                    inline: true
                },
                {
                    name: "🎤 Total Voice Channels: ",
                    value: message.guild.channels.cache.filter(channel => channel.type === 'voice').size,
                    inline: true
                }
            )       
            await message.channel.send(embed)
    }
}