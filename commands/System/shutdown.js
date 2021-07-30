module.exports = {
    name: "shutdown",
    category: "System",
    description: "Shutdown the Bot",
    usage: "[command]",
    run: async (client, message, args) => {
        try {
            if (message.author.id !== require('../../config.json').Admin) {
                return message.channel.send('Insufficient permission!!')
            } else {
                await message.channel.send('Shutting down...')
                console.log()
                console.log('Shutting down...')
                process.exit(0)
            }
        } catch (e) {
            console.error('An unexpected error expected:', e)
        }
    }
}