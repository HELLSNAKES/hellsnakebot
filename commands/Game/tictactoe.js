const { tictactoe } = require('reconlx')

module.exports = {
    name : 'tictactoe',
    category: "Game",
    description: "tictactoe",
    usage: "[command+user]",
    run : async(client, message, args) => {
        const member = message.mentions.members.first() 
            if(!member)  return  message.channel.send('Please mention a user!')
        new tictactoe({
            player_two: member, 
            message: message
        })
    }
}