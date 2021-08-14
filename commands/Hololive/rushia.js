const fetch = require('node-fetch')
const Discord = require("discord.js");

module.exports = {
    name: "rushia",
    category: "Hololive",
    description: "random rushia img",
    timeout: 3000,
    usage: "[command]",
    run: async(client, message, args) => {
            const url = `https://img-hololive-api.up.railway.app/rushia`
            let response
            try{
                response = await fetch(url).then(res => res.json())
            }
            catch(e) {
                return message.reply('An Error Occured, Try Again Later.')
            }
            const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Rushia awa`)
            .setURL(response.url)
            .setImage(response.url) 
            message.channel.send(embed)
    }
}
   