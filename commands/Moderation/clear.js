const { MessageEmbed } = require('discord.js')
module.exports = {
    name: "clear",
    category: "Moderation",
    description: "delete message",
    timeout: 5000,
    usage: "[COMMAND] + [amount]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
    run: async (client, message, args) => {
        if (!message.member.permissions.has("MANAGE_MESSAGES"))
            return message.channel.send(`Insufficient permission!!`);
        if (!args[0]) {
            return message.channel.send(`Please enter a amount 1 to 100`)
        }
        let deleteAmount;
        if (parseInt(args[0]) > 100 ) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }
        await message.channel.bulkDelete(deleteAmount, true);
        const embed = new MessageEmbed()
            .setTitle(`${message.author.username}`)
            .setThumbnail(message.author.displayAvatarURL())
            .setDescription(`successfully deleted ${deleteAmount}`)
            .setFooter(message.author.username, message.author.displayAvatarURL())
            .setColor('RANDOM')
        await message.channel.send(embed).then(embed => { embed.delete({ timeout: 5000 }) })
    }
}