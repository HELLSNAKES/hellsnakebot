const fetch = require('node-fetch')
module.exports = {
    name: "simsimi",
    category: "Utility",
    description: "Talk with SimSimi",
    usage: "[command] + [text]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
    run: async(client, message, args) => {
            const text = args.join(' ')
            if(!text) return message.channel.send('Usage [command] + [text]')
            const url = `https://tuanxuong.com/api/simsimi/index.php?text=${encodeURIComponent(text)}` //tks lanh han seola
            let response
            try{
                response = await fetch(url).then(res => res.json())
            }
            catch(e) {
                return message.reply('An Error Occured, Try Again Later.')
            }
            message.reply(response.response)
    }
}
   