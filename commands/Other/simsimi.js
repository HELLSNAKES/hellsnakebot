const axios = require('axios');
module.exports = {
    name: "simsimi",
    category: "Other",
    description: "Talk with SimSimi",
    usage: "[command] + [text]",
    run: async(client, message, args) => {
        try {
            const url = await axios.get(`https://api.simsimi.net/v1/?text=${encodeURIComponent(args.join(''))}&lang=vi_VN`)
            message.channel.send(url.data.success)
        }
        catch(e) {
            message.channel.send('An Error Occured, Try Again Later.')
        }
    }
}
   