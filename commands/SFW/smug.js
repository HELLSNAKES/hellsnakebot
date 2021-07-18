const client = require('nekos.life');
const neko = new client();
const Discord = require("discord.js");
module.exports = {
  name: "smug",
  category: "SFW",
  description: "random smug pic",
  usage: "[command]",
  timeout: 5000,
  run: async(client, message, args) => {
    let url = await neko.sfw.wallpaper()
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Smug")
    .setImage(url.url) 
    message.channel.send(embed)
  }
}