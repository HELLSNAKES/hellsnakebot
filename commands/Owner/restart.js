module.exports = {
    name: "restart",
    category: "Owner",
    description: "Restart the Bot",
    usage: "[command]",
    run: async (client, message, args) => {
        try {
            if (message.author.id !== require('../../config.json').Admin) {
                return message.channel.send('Insufficient permission!!')
            } else {
                message.channel.send('Restarting...')
                console.log()
                console.log('Restarting...')
                process.exit(2)
            }
        } catch (e) {
            console.error('An unexpected error expected:', e)
        }
    }
}