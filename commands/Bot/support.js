const Discord = require("discord.js");
const disbut = require('discord-buttons');

module.exports = {
    name: 'support',
    category: "Bot",
    description: "support for bot",
    timeout: 5000,
    usage: "[command]",
    run: async (client, message, args) => {
       const embed = new Discord.MessageEmbed()
        .setTitle("Support")
        .setThumbnail(client.user.displayAvatarURL())
        .addField(`📩Email`,`hellsnakess@hotmail.com`)
        .setColor("RANDOM")
        const button = new disbut.MessageButton()
  .setStyle('url')
  .setURL('https://discords.com/bio/p/hellsnake') 
  .setLabel('Discord') 
  const button2 = new disbut.MessageButton()
  .setStyle('url')
  .setURL('https://facebook.com/hellsnake98') 
  .setLabel('Facebook') 
  const button3 = new disbut.MessageButton()
  .setStyle('url')
  .setURL('https://github.com/HELLSNAKES/hellsnake-bot') 
  .setLabel('Github') 
  let row = new disbut.MessageActionRow()
        .addComponent(button)
        .addComponent(button2)
        .addComponent(button3)
message.channel.send("", { embed: embed, components: row })
    }
}