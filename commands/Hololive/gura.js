const fetch = require('node-fetch')
const Discord = require("discord.js");

module.exports = {
    name: "gura",
    category: "Hololive",
    description: "random gawr gura img",
    timeout: 3000,
    usage: "[command]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
    run: async(client, message, args) => {
            const url = `https://img-hololive-api.up.railway.app/gura`
            let response
            try{
                response = await fetch(url).then(res => res.json())
            }
            catch(e) {
                return message.reply('An Error Occured, Try Again Later.')
            }
            const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Gura awa`)
            .setURL(response.url)
            .setImage(response.url) 
            message.channel.send(embed)
    }
}
   