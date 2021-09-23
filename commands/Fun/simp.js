const Discord = require('discord.js')

module.exports = {
    name: "simp",
    category: "Fun",
    description: "How much of a simp are you?",
    usage: "[command | user]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
    run: async(client, message, args) => {
        const mentionedMember = message.mentions.users.last()
        if (!mentionedMember) return message.channel.send('Please mention a user!')
        const simpr8 = Math.floor(Math.random() * 100) + 0;
        const embed = new Discord.MessageEmbed()
           .setTitle(`Simp r8 machine`)
           .setDescription(`:shrimp:  ${mentionedMember} is ${simpr8}% simp`)
           .setColor(`RANDOM`)
           message.channel.send(embed)
    }
}