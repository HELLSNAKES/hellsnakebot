const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "invite",
    category: "Bot",
    description: "invite",
    timeout: 10000,
    usage: "[command]",
    run: async (client, message, args) => {
        const config = require('../../config.json')
        if (config.oauthv2link == '') {
            return message.channel.send('Missing `oauthv2link` in config.json.')
        } else {
            if (!config.oauthv2link.toString().startsWith('https://discord.com/oauth2/authorize')) {
                return message.channel.send('Please provides a vaild OAuth2 link.')
            } else {
                /*
                if(!config.oauthv2link.toString().contains('client_id')) {
                    return message.channel.send('Your OAuth2 links not contains `client_id`.')
                } else {
                    if(!config.oauthv2link.toString().contains('scope=bot')) {
                        return message.channel.send('Please provide `scope=bot`.')
                    }
                }
                */
                message.channel.send(
                    new MessageEmbed()
                        .setTitle(`${client.user.username}'s invite link:`)
                        .setThumbnail(client.user.displayAvatarURL())
                        .setColor("RANDOM")
                        .setDescription(`My invite link is: ${config.oauthv2link}`)
                )
            }
        }
    }
}
