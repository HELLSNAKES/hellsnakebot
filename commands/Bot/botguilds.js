const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "botguild",
    category: "Bot",
    description: "Botguild",
    timeout: 10000,
    usage: "[command]",
    run: async (client, message, args) => {
        const guilds = client.guilds.cache
        .sort((a, b) => b.memberCount - a.memberCount)
        .first(50);
        const description = guilds.map((guild, index) => {
           return `${index+1}) ${guild.name}: ${guild.memberCount} members`
        }).join('\n')
        message.channel.send(
            new MessageEmbed()
            .setTitle(`${client.user.username}'s top Guild:`)
            .setThumbnail(client.user.displayAvatarURL())
            .setColor("RANDOM")
            .setDescription(description)
        )
    }
}
