const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    category: "Bot",
    description: "Returns latency and API ping",
    usage: "[command]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
     run: async (client, message, args) => {
            let member = message.member;
            let embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle(`PONG! :ping_pong:`)
            .setThumbnail(member.user.displayAvatarURL())
            .addFields(
                {name: 'Latency', value: `\`${Date.now() - message.createdTimestamp}ms\``},
                {name: 'API Latency', value: `\`${Math.round(client.ws.ping)}ms\``},
            )
    message.channel.send({embed});
    }
}