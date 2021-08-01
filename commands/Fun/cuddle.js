const client = require('nekos.life');
const neko = new client();
const Discord = require("discord.js");
module.exports = {
  name: "cuddle",
  category: "Fun",
  description: "cuddle someone",
  usage: "[command]+[user]",
  timeout: 5000,
  run: async(client, message, args) => {
    const member = message.mentions.members.first();
    if (!member)
      return message.channel.send(`Who do you want to cuddle??`)
    let url = await neko.sfw.cuddle()
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`<@${member.user.id}>, you got a cuddle from ${message.author.username} (=；ェ；=)`)
    .setImage(url.url) 
    message.channel.send(embed)
  }
}