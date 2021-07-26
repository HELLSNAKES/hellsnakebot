const client = require('nekos.life');
const neko = new client();
const Discord = require("discord.js");

module.exports = {
    name: "nsfwneko",
    category: "NSFW",
    description: "random neko pic",
    usage: "[command]",
    timeout: 5000,
    run: async(client, message, args) => {
        if (!message.channel.nsfw) {
            message.react('💢');
            return message.reply(`This is not an NSFW Channel`)
        } else {
            let url = await neko.nsfw.neko()
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle("NSFW Neko")
                    .setImage(url.url) 
                    message.channel.send(embed) 
        }
    }
}