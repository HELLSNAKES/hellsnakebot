const Discord = require('discord.js');

module.exports = {
    name: "announcement",
    category: "Moderation",
    description: "announcement",
    usage: "[COMMAND] + [Channel] + [Text]",
    run: async (client, message, args) => {
        if (!message.member.permissions.has('ADMINISTRATOR'))
        return message.channel.send(`Insufficient permission!!`);
        const channel = message.mentions.channels.first()
        if (!args.length) return message.channel.send(`Usage: announcement #channel <text>`) 
        if (!channel) {
            message.reply("Specify A Channel To Send This Announcement")
            return
        } else {
            let announce = args.slice(1).join(" ")
            if(!announce) return message.channel.send(`Please Specify What Do You Want To Announce`)
            const embed = new Discord.MessageEmbed()
            .setTitle(`🔰Announcement🔰`)
            .setDescription(`${announce}`)
            .setThumbnail(message.author.displayAvatarURL())
            .setFooter("Sent by:"+ message.author.username +'#'+ message.author.discriminator)
            .setColor("RANDOM")
            channel.send(embed)
            channel.send(`@everyone`).then(m => m.delete())
        }
    }
}