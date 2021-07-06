const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "botguild",
    category: "System",
    description: "Botguild",
    usage: "[command]",
    run: async (client, message, args) => {
        const guilds = client.guilds.cache
        .sort((a, b) => b.memberCount - a.memberCount)
        .first(15);
        const description = guilds.map((guild, index) => {
           return `${index+1}) ${guild.name}: ${guild.memberCount} members`
        }).join('\n')
        message.channel.send(
            new MessageEmbed()
            .setTitle("HELLSNAKE top Guilds")
            .setThumbnail(client.user.displayAvatarURL())
            .setColor("RANDOM")
            .setDescription(description)
        )
    }
}
