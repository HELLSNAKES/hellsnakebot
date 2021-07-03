const Discord = require('discord.js');
const { Admin } = require('../../config.json');
const client = new Discord.Client()

module.exports = {
    name: "setavatarbot",
    category: "Owner",
    description: "Set avatar bot",
    usage: "[command +url]",
    run: async (client, message, args) => {
   let avatarurl = args.join(" ");
   if(message.author.id !== Admin) return message.channel.send('Insufficient permission!!')
   client.user.setAvatar(`${avatarurl}`)
   if (!avatarurl) return message.channel.send(`Usage: setavatarbot <url>`)
   let embed = new Discord.MessageEmbed()
       .setTitle('New Avatar Set')
       .setImage(`${avatarurl}`)
       .setTimestamp()
    message.channel.send(embed)
    .catch(e => {
        console.log(e)
        return message.channel.send("Something Went Wrong!")
    })
  }
}