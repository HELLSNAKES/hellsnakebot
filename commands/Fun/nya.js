const client = require('nekos.life');
const neko = new client();
const Discord = require("discord.js");
module.exports = {
  name: "nya",
  category: "Fun",
  description: "Mew!",
  usage: "[command]",
  timeout: 5000,
  author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
  run: async(client, message, args) => {
    let url = await neko.sfw.catText()
    message.reply(url.cat)
  }
}