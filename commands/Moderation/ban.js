const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "ban",
    category: "Moderation",
    description: "Ban member",
    usage: "[command]+[reason]+[user] ",
    run: async(client, message, args) => {
        const member = message.mentions.members.first()
        const reason = args.slice(1).join(" ")

        if(!message.member.hasPermission('BAN_MEMBERS')) {
            const no = new MessageEmbed()
            .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({ dynamic: true})}`)
            .setDescription(`Insufficient permission!!`)
            .setColor(`RANDOM`)
            message.channel.send(no)
        } else {
            if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
                    const no2 = new MessageEmbed()
                    .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({ dynamic: true})}`)
                    .setDescription(`I dont have permissions to ban!`)
                    .setColor(`RANDOM`)
                    message.channel.send(no2)
            } else {

            if(!member) {
                const members = new MessageEmbed()
                .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({ dynamic: true})}`)
                .setDescription(`Please mention a user!`)
                .setColor(`RANDOM`)
                message.channel.send(members)
            } else {
                if(!reason) {
                    const reason = new MessageEmbed()
                    .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL()}`)
                    .setDescription(`Please specify a reason!`)
                    .setColor(`RANDOM`)
                    message.channel.send(reason)
                } else {
                    if(member.bannable) {
                        member.ban({reason: reason})
                        const done = new MessageEmbed()
                        .setTitle('Success!')
                        .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({ dynamic: true})}`)
                        .setDescription(`Banned ${member} for ${reason}.`)
                        .setFooter(`Requested by: ${message.author.username}`)
                        .setColor(`RANDOM`)
                        message.channel.send(done)
                    } else {
                        const cant = new MessageEmbed()
                        .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL()}`)
                        .setDescription("That user is a mod/admin, I can't do that.")
                        .setColor(`RANDOM`)
                        message.channel.send(cant)
                    }
                }
            }
        }

    }
   }
}