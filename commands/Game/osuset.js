module.exports = {
    name: "osuset",
    category: "Game",
    description: "Set the osu username.",
    usage: "[command + username]",
    run: async (client, message, args) => {
        if(client.data.osu == undefined) {
            client.data.osu = {}
            client.updateData()
        }
        const fetch = require('node-fetch')
        const config = require('../../config.json')
        if(args.length == 0) {
            return message.channel.send(`Please specify a username!`)
        } else {
            var username = args.join(' ')
        }
        if (config.osuAPI.client_id == '' || config.osuAPI.client_secret == '') {
            message.channel.send('Missing `client_id` or `client_secret` in config.json.')
        } else {
            if (isNaN(config.osuAPI.client_id)) {
                message.channel.send('typeof `client_id` is not number.')
            } else {
                if (typeof config.osuAPI.client_secret != 'string') {
                    message.channel.send('typeof `client_secret` is not string.')
                }
                var api = `https://osu.ppy.sh/api/v2/users/${encodeURIComponent(username)}`
                var clientgrant = await fetch("https://osu.ppy.sh/oauth/token", {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "grant_type": "client_credentials",
                        "client_id": parseInt(config.osuAPI.client_id),
                        "client_secret": config.osuAPI.client_secret,
                        "scope": "public"
                    })
                })

                var clientgrant = await clientgrant.json()
                var accesstoken = clientgrant.access_token
                var headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application.json',
                    'Authorization': `Bearer ${accesstoken}`
                }

                var res = await fetch(api, {
                    method: 'GET',
                    headers: headers
                })

                var js = await res.json()
                if (js.authentication == 'basic') {
                    message.channel.send('The `client_id` and/or the `client_secret` in config.json is incorrect. Unable to get user info.')
                } else {
                    if (js.id == undefined) {
                        message.channel.send(`:red_circle: \`${decodeURIComponent(username)}\` was not found on osu! Bancho server.`)
                    } else {
                        client.data.osu[message.author.id] = js.username
                        client.updateData()
                        message.channel.send(`:white_check_mark: \`${message.author.username}\`'s osu!username is now \`${js.username}\`.`)
                    }
                }
            }
        }
    }
}