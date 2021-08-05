const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "poll",
  category: "Utility",
  description: "starts a poll",
  timeout: 5000,
  usage: "[command] + [channel] + [question]",
    run: async (client, message, args) => {
        let channelID = message.mentions.channels.first()
        let theDescription = args.slice(1).join(" ")
        if(!channelID) return message.reply("Please specify a channel you want the poll to be in!")
        if(!theDescription) return message.reply("Please specify a question for the poll!")
        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("🎈POLL TIME")
        .setDescription(theDescription)
        .setThumbnail(message.author.displayAvatarURL())
        .setFooter("Poll started by: "+ message.author.username +'#'+ message.author.discriminator) 
        let msgEmbed = await channelID.send(embed)
        await msgEmbed.react('✅')
        await msgEmbed.react('❌')
    }
}