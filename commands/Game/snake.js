const { Snake } = require("weky");
const Discord = require("discord.js")
require('@weky/inlinereply');

module.exports = {
    name: "snake",
    description: "Let play snake game",
    category: "Game",
    timeout: 5000,
    usage: "[command]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
     run: async (client, message, args) => {
        await Snake({
            message: message,
            embed: {
                title: 'Snake Game',
                description: 'GG, you scored **{{score}}** points!',
                color: '#7289da',
                timestamp: true,
            },
            emojis: {
                empty: '⬛',
                snakeBody: '♿',
                food: '💩',
                up: '⬆️',
                right: '⬅️',
                down: '⬇️',
                left: '➡️',
            },
            othersMessage: 'Only <@{{author}}> can use the buttons!',
            buttonText: 'Cancel',
        });
}}