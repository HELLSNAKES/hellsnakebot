const { hangman } = require('reconlx')

module.exports = {
    name : 'hangman',
    category: "Game",
    description: "hangman",
    usage: "[command+ [channel] + [word to guess]",
    run : async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) 
         return message.channel.send('Insufficient permission!!')
        const hang = new hangman({
            message: message,
            word: word,
            client: client,
            channelID: channel.id,
        })
        hang.start();
    }
}