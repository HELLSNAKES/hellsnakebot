const Discord = require('discord.js');
const fs = require('fs')
module.exports = {
    name: 'setprefix',
    aliases : ["prefix"],
    category: "Bot",
    description: "set prefix bot",
    usage: "[command]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
     run: async (client, message, args) => {
        if (!message.member.permissions.has("MANAGE_MESSAGES"))
        return message.channel.send(`Insufficient permission!!`);
        if(!args[0]) 
        return message.channel.send('usage [command] + [prefix]')
        let prefixes = JSON.parse(fs.readFileSync("./database/setprefix.json", "utf8"));

        prefixes[message.guild.id] = {
            prefixes: args[0]
        };
        fs.writeFile("./database/setprefix.json", JSON.stringify(prefixes), function (err) {
            if (err) console.log(err)
          })
        let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setThumbnail(client.user.displayAvatarURL())
        .setTitle('<:icon:878934851913384006> Custom Prefix')
        .setDescription(`***Current server prefix(es):*** \`${args[0]}\``)
        message.channel.send(embed)
     }  
}