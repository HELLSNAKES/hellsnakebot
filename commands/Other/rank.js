const Discord = require("discord.js")
const fs = require("fs");
if (!fs.existsSync('./database/xp.json')) {
    fs.mkdirSync('./database', {
      mode: 0o777,
      recursive: true
    })
    fs.appendFileSync('./database/xp.json', '{}')
}
const xpfile = require("../../database/xp.json");
module.exports = {
    name: "rank",
    category: "Other",
    description: "rank",
    usage: "[command | user] or [command]",
    run: async(client, message, args) => {
        const member = message.mentions.members.first() || message.member;
        const rank = new Discord.MessageEmbed()
        .setTitle(`🔰RANK🔰`)
        .setColor("RANDOM")
        .setThumbnail(member.user.displayAvatarURL())
        .addField("User:",member.user.username)
        .addField("Level: ",xpfile[member.id].level)
        .addField("XP: ", xpfile[member.id].xp+"/"+xpfile[member.id].reqxp)
        .addField("XP Required: ",xpfile[member.id].reqxp)
        message.channel.send(rank)
    }
}; 