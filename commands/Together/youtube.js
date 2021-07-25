const discord = require('discord.js')
const { DiscordTogether } = require("discord-together");

module.exports = {
    name: "youtube",
    aliases: ["yt"],
    category: "Togerther",
    description: "Watch YouTube with your friends, on discord!",
    timeout: 5000,
    usage: "[command]",
    run: async(client, message, args) => {
        client.discordTogether = new DiscordTogether(client);
        if (message.member.voice.channel) {
            client.discordTogether
                .createTogetherCode(message.member.voice.channelID, "youtube")
                .then(async (invite) => {
                    return message.channel.send(`${invite.code}`);
                })
        } else {
            message.channel.send('You need to be in a voice channel');
        }
    }
}
       