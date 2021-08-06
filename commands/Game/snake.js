const SnakeGame = require('snakecord');
const Discord = require("discord.js")
module.exports = {
    name: "snake",
    description: "Let play snake game",
    category: "Game",
    timeout: 50000,
    usage: "[command]",
     run: async (client, message, args) => {
    const snakeGame = new SnakeGame({
    title: 'Snake Game',
    color: "GREEN",
    timestamp: true,
    gameOverTitle: "Game Over",
    })
    snakeGame.newGame(message);
}}