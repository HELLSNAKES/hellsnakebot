const prefixSchema = require('../../schemas/prefixcustoms')
const Discord = require('discord.js');
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
        const pre = await args.join(" ")
        if(!pre) return message.channel.send("Usage [command] + [prefix]!")     
    
        let data;
        try {
            data = await prefixSchema.findOne({
              Guild : message.guild.id,
            })
            if(!data) {
                let data = await prefixSchema.create({
                    Guild : message.guild.id,
                    Prefix : pre,
                })
                   data.save()
            } else {
                await prefixSchema.findOneAndUpdate({
                    Guild : message.guild.id,
                    Prefix : pre,
                })
            }
            let embed = new Discord.MessageEmbed()
                  .setColor('RANDOM')
                  .setThumbnail(client.user.displayAvatarURL())
                  .setTitle('<:icon:878934851913384006> Custom Prefix')
                  .setDescription(`***Current server prefix(es):*** \`${pre}\``)
                   message.channel.send(embed)
        } catch (err) {
            console.log(err)
        }
    }
}
