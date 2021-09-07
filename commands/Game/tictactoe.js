const { tictactoe } = require('reconlx')

module.exports = {
    name : 'tictactoe',
    category: "Game",
    description: "tictactoe",
    usage: "[command+user]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
    run : async(client, message, args) => {
        const member = message.mentions.members.first() 
            if(!member)  return  message.channel.send('Please mention a user!')
        new tictactoe({
            player_two: member, 
            message: message
        })
    }
}