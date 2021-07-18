const client = require('nekos.life');
const neko = new client();
const Discord = require("discord.js");
module.exports = {
  name: "tickle",
  category: "SFW",
  description: "random tickle pic",
  usage: "[command]",
  timeout: 5000,
  run: async(client, message, args) => {
    let url = await neko.sfw.tickle()
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("tickle")
    .setImage(url.url) 
    message.channel.send(embed)
  }
}