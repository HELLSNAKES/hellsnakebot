const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: "bugreport",
    aliases : ["bug"],
    category : "Bot",
    description : "Send a message to Admin",
    timeout: 300000,
    usage: "[command]+[text]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
    run: async(client, message, args) => {
       const admin = client.users.cache.get(require('../../config.json').Admin);
       const bug = args.join(" ");
       if(!bug) return message.channel.send('Please specify a bug!');

       const embed = new MessageEmbed()
       .setTitle('Bug report')
       .setColor('RANDOM')
       .addField('Username', message.author.toString(), true)
       .addField('ServerName', message.guild.name ,true)
       .addField('ServerID', message.guild.id , true)
       .addField('Bug', bug)
       .setThumbnail(message.author.displayAvatarURL())
       .setTimestamp()
       message.reply(`***Thanks for finding the bug! :)***`);
       admin.send(embed) 
    }
}