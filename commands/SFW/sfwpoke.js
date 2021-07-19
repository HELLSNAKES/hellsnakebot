const client = require('nekos.life');
const neko = new client();
const Discord = require("discord.js");
module.exports = {
  name: "sfwpoke",
  category: "SFW",
  description: "random poke pic",
  usage: "[command]",
  timeout: 5000,
  run: async(client, message, args) => {
    let url = await neko.sfw.poke()
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("SFW Poke")
    .setImage(url.url) 
    message.channel.send(embed)
  }
}