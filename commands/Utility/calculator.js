const Discord = require("discord.js")
const { Calculator } = require("weky");
require('@weky/inlinereply');

module.exports = {
    name: "calculator",
    category: "Utility",
    description: "calculator",
    usage: "[command]",
    timeout: 5000,
    run: async(client, message, args) => {
        await Calculator({
            message: message,
            embed: {
                title: 'Calculator',
                color: '#7289da',
                timestamp: true
            },
            disabledQuery: 'Calculator is disabled!',
            invalidQuery: 'The provided equation is invalid!',
            othersMessage: 'Only <@{{author}}> can use the buttons!'
        });
    }        
}