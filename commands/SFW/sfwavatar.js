const client = require('nekos.life');
const neko = new client();
const Discord = require("discord.js");
module.exports = {
  name: "sfwavatar",
  category: "SFW",
  description: "random avatar pic",
  usage: "[command]",
  timeout: 5000,
  run: async(client, message, args) => {
    let url = await neko.sfw.avatar()
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("SFW Avatar")
    .setImage(url.url) 
    message.channel.send(embed)
  }
}