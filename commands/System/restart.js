module.exports = {
    name: "restart",
    category: "System",
    description: "Restart the Bot",
    usage: "[command]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
    run: async (client, message, args) => {
        try {
            if (message.author.id !== require('../../config.json').Admin) {
                return message.channel.send('Insufficient permission!!')
            } else {
                await message.channel.send('Restarting...')
                console.log()
                console.log('Restarting...')
                process.exit(2)
            }
        } catch (e) {
            console.error('An unexpected error expected:', e)
        }
    }
}