const Discord = require('discord.js');
const mines = require('discord-minesweeper');

module.exports = {
    name : 'minesweeper',
    aliases: ["misw"],
    category: "Game",
    description: "minesweeper",
    timeout: 10000,
    usage: "[command]",
    run : async(client, message, args) => {
        message.channel.send(mines(9, 9, 10, 'X', true));
    }
}