module.exports = {
    name: "levelup",
    category: "Bot",
    description: "Control level up.",
    timeout: 10000,
    usage: "[command + on/off]",
    run: async (client, message, args) => {
        const config = require('../../config.json')
        var setting = args[0]
        if(setting == undefined) {
            return message.channel.send(`Usage: ${config.prefix}levelup on/off`)
        } else {
            if(setting != 'on' && setting != 'off') {
                return message.channel.send(`Usage: ${config.prefix}levelup on/off`)
            } else {
                if(setting == 'on') {
                    client.data.levelconfig[message.author.id] = true
                } else {
                    client.data.levelconfig[message.author.id] = false
                }
                client.updateData();
                return message.channel.send(`Level up notification will now \`${setting}\`.`)
            }
        }
    }
}