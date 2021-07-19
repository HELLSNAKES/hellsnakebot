const client = require('nekos.life');
const neko = new client();
const Discord = require("discord.js");
module.exports = {
  name: "sfwbaka",
  category: "SFW",
  description: "random baka pic",
  usage: "[command]",
  timeout: 5000,
  run: async(client, message, args) => {
    let url = await neko.sfw.baka()
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("SFW Baka")
    .setImage(url.url) 
    message.channel.send(embed)
  }
}