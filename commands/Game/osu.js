
const rect = function (ctx, x, y, width, height, radius = 5) { //source at https://github.com/Moorad/the-beautiful-bot/blob/master/handlers/format.ts
    if (typeof radius === 'number') {
        radius = {
            tl: radius,
            tr: radius,
            br: radius,
            bl: radius
        };
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    ctx.fill();
}

module.exports = {
    name: 'osu',
    category: "Game",
    description: "Informations about the osu!player",
    usage: '[command + username]',
    run: async function (client, message, args) {
        var config = require('../../config.json')
        const { MessageAttachment } = require('discord.js');
        const path = require('path')
        const fetch = require('node-fetch')
        const { Image, createCanvas, registerFont, loadImage } = require('canvas')
        const rootpath = path.resolve(__dirname, '..', '..', "assets");
        registerFont(path.join(rootpath, "font.ttf"), { family: 'Varela' })
        if (args == []) {
            var username = ''
        } else {
            var username = encodeURIComponent(args.join(' ').trim());
        }
        var reply
        try {
            switch (username) {
                case "":
                    reply = `Please specify a username!`
                    message.channel.send(reply)
                    break;
                default:
                    if (config.osuAPI == undefined) {
                        message.channel.send('Missing `osu!API` in config.json.')
                    } else {
                        if (config.osuAPI.client_id == '' || config.osuAPI.client_secret == '') {
                            message.channel.send('Missing `client_id` or `client_secret` in config.json.')
                        } else {
                            if (typeof config.osuAPI.client_id != 'number') {
                                message.channel.send('typeof `client_id` is not number.')
                            } else {
                                if (typeof config.osuAPI.client_secret != 'string') {
                                    message.channel.send('typeof `client_secret` is not string.')
                                }
                                var api = `https://osu.ppy.sh/api/v2/users/${encodeURIComponent(username)}/osu`

                                var clientgrant = await fetch("https://osu.ppy.sh/oauth/token", {
                                    method: 'post',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        "grant_type": "client_credentials",
                                        "client_id": config.osuAPI.client_id,
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
                                        message.channel.send(`"${decodeURIComponent(username)}" was not found on osu! Bancho server.`)
                                    }
                                    else {

                                        var username = js.username
                                        var globalrank = js.statistics.global_rank
                                        if (globalrank == null) {
                                            var globalrank = '-'
                                        }
                                        var countryrank = js.statistics.rank.country
                                        if (countryrank == null) {
                                            var countryrank = '-'
                                        }
                                        var score = js.statistics.ranked_score
                                        var country = js.country.name
                                        var countrycode = js.country.code
                                        var accuracy = js.statistics.hit_accuracy.toFixed(2)
                                        var pp = Number(js.statistics.pp).toFixed(0)
                                        var level = js.statistics.level.current
                                        var levelprogress = js.statistics.level.progress
                                        var playtime = (Number(js.statistics.play_time) / 3600).toFixed(1) + "h"
                                        var A = js.statistics.grade_counts.a
                                        var S = js.statistics.grade_counts.s
                                        var SH = js.statistics.grade_counts.sh
                                        var SS = js.statistics.grade_counts.ss
                                        var SSH = js.statistics.grade_counts.ssh
                                        if (score > 999999999) {
                                            var score = (score / 1000000000).toFixed(1) + `B`
                                        }
                                        else if (score > 999999) {
                                            var score = (score / 1000000).toFixed(1) + `M`
                                        }
                                        else if (score > 99999) {
                                            var score = (score / 1000).toFixed(1) + `K`
                                        }
                                        else {
                                            var score = score //lmao
                                        }
                                        const canvas = createCanvas(1200, 624)
                                        const ctx = canvas.getContext('2d')
                                        //new img object
                                        const img = new Image()
                                        //template
                                        img.onload = function () { ctx.drawImage(img, 0, 0) }
                                        img.src = path.join(rootpath, "backgroundcard.png")
                                        //avatar
                                        var avatarimg = await loadImage(js.avatar_url)
                                        ctx.drawImage(avatarimg, 45, 55, 277, 277)
                                        img.onload = function () { ctx.drawImage(img, 45, 55) }
                                        img.src = path.join(rootpath, "avatarcornerround.png")
                                        //username
                                        ctx.fillStyle = "#ffffff"
                                        ctx.font = '63px Varela'
                                        ctx.fillText(username, 347, 56 + 63)
                                        //flag
                                        var flag = await loadImage(`https://osu.ppy.sh/images/flags/${countrycode}.png`)
                                        ctx.drawImage(flag, 350, 130, 60, 40)
                                        ctx.font = '40px Varela'
                                        ctx.fillText(country, 420, 127 + 40)
                                        //a,s,sh,ss,ssh
                                        ctx.fillStyle = `#ffffff`
                                        ctx.font = '28px Varela'
                                        ctx.textAlign = 'center'
                                        ctx.fillText(A, 792 + 22, 171 + 25 + 28)
                                        ctx.fillText(S, 955 + 16, 171 + 25 + 28)
                                        ctx.fillText(SH, 1108 + 22, 171 + 25 + 28)
                                        ctx.fillText(SS, 888 + 9, 279 + 25 + 28)
                                        ctx.fillText(SSH, 1038 + 13, 279 + 25 + 28)
                                        //rank
                                        ctx.textAlign = 'left'
                                        ctx.font = '75px Varela'
                                        ctx.fillText("#" + globalrank, 347, 170 + 75)
                                        ctx.font = '57px Varela'
                                        ctx.fillText('#' + countryrank, 347, 259 + 57)
                                        //level
                                        ctx.textAlign = 'center'
                                        ctx.font = '33px Varela'
                                        ctx.fillText(Math.floor(level || 0), 378, 332 + 50)
                                        ctx.fillStyle = '#969696'//790, 370
                                        rect(ctx, 440, 360, 504, 12, 7)
                                        ctx.fillStyle = 'rgb(255, 204, 34)'
                                        rect(ctx, 440, 360, 504 / 100 * levelprogress, 12, 7)
                                        ctx.textAlign = 'left'
                                        ctx.fillStyle = "#FFFFFF"
                                        ctx.font = '21px Varela'
                                        ctx.fillText(levelprogress + '%', 960, 359 + 21)
                                        //stuff
                                        ctx.textAlign = 'center'
                                        ctx.font = '40px Varela'
                                        ctx.fillText(pp, 82 + 60, 534 + 40)
                                        ctx.fillText(accuracy + '%', 324 + 75, 537 + 40)
                                        ctx.fillText(playtime, 651 + 50, 536 + 40)
                                        ctx.fillText(score, 930 + 100, 536 + 40)
                                        img.onload = function () { ctx.drawImage(img, 252, 261) }
                                        img.src = path.join(rootpath, "osu.png")
                                        //stream
                                        const attachment = new MessageAttachment(canvas.toBuffer())
                                        message.channel.send(attachment)
                                    }
                                }
                            }
                        }
                    }
                break;
            }
        } catch (e) {
            if (e) {
                console.error('An unexpected error occured:', e)
                message.channel.send('An unexpected error occured: ' + e)
            }
        }
    }
}