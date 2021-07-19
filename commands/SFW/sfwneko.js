const client = require('nekos.life');
const neko = new client();
const Discord = require("discord.js");
module.exports = {
  name: "sfwneko",
  category: "SFW",
  description: "random neko pic",
  usage: "[command]",
  timeout: 5000,
  run: async(client, message, args) => {
    let url = await neko.sfw.neko()
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("SFW Neko")
    .setImage(url.url) 
    message.channel.send(embed)
  }
}