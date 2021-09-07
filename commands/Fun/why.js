const client = require('nekos.life');
const neko = new client();
const Discord = require("discord.js");
module.exports = {
  name: "why",
  category: "Fun",
  description: "random why?",
  usage: "[command]",
  timeout: 5000,
  author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
  run: async(client, message, args) => {
    let url = await neko.sfw.why()
    const embed = new Discord.MessageEmbed()
    .setTitle('**Why??**')
    .setThumbnail(client.user.displayAvatarURL())
    .setColor("RANDOM")
    .setDescription(url.why) 
    message.channel.send(embed)
  }
}