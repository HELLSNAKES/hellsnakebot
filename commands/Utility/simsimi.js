const fetch = require('node-fetch')
module.exports = {
    name: "simsimi",
    category: "Utility",
    description: "Talk with SimSimi",
    usage: "[command] + [text]",
    run: async(client, message, args) => {
            const text = args.join(' ')
            if(!text) return message.channel.send('Usage [command] + [text]')
            const url = `https://api.simsimi.net/v1/?text=${encodeURIComponent(text)}&lang=vi_VN`
            let response
            try{
                response = await fetch(url).then(res => res.json())
            }
            catch(e) {
                return message.reply('An Error Occured, Try Again Later.')
            }
            message.channel.send(response.success)
    }
}
   