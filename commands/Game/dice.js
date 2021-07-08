const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "dice",
    category: "Game",
    description: 'Dice roll command!',
    usage: "[command]",
    run: async (client, message, args) => {
        const rolls = ["1", "2", "3", "4", "5", "6"];
        const roll = rolls[Math.floor(Math.random() * rolls.length)];
        let Embed = new MessageEmbed()
        .setTitle("🎲 Dice Roll!")
        .setThumbnail(message.author.displayAvatarURL())
        .setColor("RANDOM")
        .setDescription(`You rolled a **${roll}**!`)
        .setTimestamp()
        message.channel.send(Embed)
    }   
}