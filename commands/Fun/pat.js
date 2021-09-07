const client = require('nekos.life');
const neko = new client();
const Discord = require("discord.js");
module.exports = {
  name: "pat",
  category: "Fun",
  description: "pat someone",
  usage: "[command]+[user]",
  timeout: 5000,
  author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
  run: async(client, message, args) => {
    const member = message.mentions.members.first();
    if (!member)
      return message.channel.send(`Who do you want to pat??`)
    let url = await neko.sfw.pat()
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`<@${member.user.id}>, you got a pat from ${message.author.username} (=･ω･=)`)
    .setImage(url.url) 
    message.channel.send(embed)
  }
}