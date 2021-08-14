const fetch = require('node-fetch')
const Discord = require("discord.js");

module.exports = {
    name: "pekora",
    category: "Hololive",
    description: "random pekora img",
    timeout: 3000,
    usage: "[command]",
    run: async(client, message, args) => {
            const url = `https://img-hololive-api.up.railway.app/pekora`
            let response
            try{
                response = await fetch(url).then(res => res.json())
            }
            catch(e) {
                return message.reply('An Error Occured, Try Again Later.')
            }
            const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Pekora awa`)
            .setURL(response.url)
            .setImage(response.url) 
            message.channel.send(embed)
    }
}
   