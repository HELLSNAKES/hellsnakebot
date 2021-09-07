const Discord = require('discord.js');

module.exports = {
    name: 'unmute',
    category: "Moderation",
    description: "Unmutes A User",
    usage: "[command]+ [User]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
    run : async(client, message, args) => {
        if (!message.member.permissions.has("MANAGE_MESSAGES"))
            return message.channel.send(`Insufficient permission!!`);
        if(!message.guild.me.hasPermission("MANAGE_MESSAGES"))
            return message.channel.send(`I dont have permissions to umute`);
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!Member) return message.channel.send('Please mention a user!')

        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');

        await Member.roles.remove(role)

        message.channel.send(`${Member.displayName} is now unmuted`)
    }
}