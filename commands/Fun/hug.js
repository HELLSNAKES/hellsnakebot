const client = require('nekos.life');
const neko = new client();
const Discord = require("discord.js");
module.exports = {
  name: "hug",
  category: "Fun",
  description: "hug someone",
  usage: "[command]+[user]",
  timeout: 5000,
  run: async(client, message, args) => {
    const member = message.mentions.members.first();
    if (!member)
      return message.channel.send(`Who do you want to hug??`)
    let url = await neko.sfw.hug()
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`<@${member.user.id}>, you got a hug from ${message.author.username} owo`)
    .setImage(url.url) 
    message.channel.send(embed)
  }
}