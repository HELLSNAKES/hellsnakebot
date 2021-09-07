const { Trivia } = require("weky");
const Discord = require("discord.js")
require('@weky/inlinereply');

module.exports = {
    name: "trivia",
    description: "Let play trivia game",
    category: "Game",
    timeout: 5000,
    usage: "[command]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
     run: async (client, message, args) => {
        await Trivia({
            message: message,
            embed: {
                title: 'Trivia Game',
                description: 'You only have **{{time}}** to guess the answer!',
                color: '#7289da',
                timestamp: true,
            },
            difficulty: 'hard',
            thinkMessage: 'I am thinking',
            winMessage:
                'GG, It was **{{answer}}**. You gave the correct answer in **{{time}}**.',
            loseMessage: 'Better luck next time! The correct answer was **{{answer}}**.',
            emojis: {
                one: '1️⃣',
                two: '2️⃣',
                three: '3️⃣',
                four: '4️⃣',
            },
            othersMessage: 'Only <@{{author}}> can use the buttons!',
            returnWinner: false,
        });
}}