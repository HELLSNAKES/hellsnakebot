const client = require('nekos.life');
const neko = new client();
const Discord = require("discord.js");
module.exports = {
  name: "slap",
  category: "Fun",
  description: "slap someone",
  usage: "[command]+[user]",
  timeout: 5000,
  author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
  run: async(client, message, args) => {
    const member = message.mentions.members.first();
    if (!member)
      return message.channel.send(`Who do you want to slap??`)
    let url = await neko.sfw.slap()
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`<@${member.user.id}>, you got a slap from ${message.author.username} ~(=^‥^)/`)
    .setImage(url.url) 
    message.channel.send(embed)
  }
}