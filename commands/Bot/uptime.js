const Discord = require("discord.js");

module.exports ={
    name: 'uptime',
    description: "Uptime the bot",
    category: "Bot",
    usage: "[command]",
     run: async (client, message, args) => {     
     let days = Math.floor(client.uptime / 86400000);
     let hours = Math.floor(client.uptime / 3600000) % 24;
     let minutes = Math.floor(client.uptime / 60000) % 60;
     let seconds = Math.floor(client.uptime / 1000) % 60;
     const uptimeembed = new Discord.MessageEmbed()
     .setTitle('HELLSNAKE-BOT')
     .setColor('RED')
     .addField(':computer: UPTIME', ` ${days}days ${hours}hrs ${minutes}min ${seconds}sec`, true)	    
     .setTimestamp(Date())
     message.channel.send(uptimeembed);
    }
}