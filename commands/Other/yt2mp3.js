

module.exports = {
    name: "yt2mp3",
    category: "Other",
    description: "Get audio file from a video in https://youtube.com",
    usage: "[command + youtunbe link/search term]",
    run: async (client, message, args) => {
        const ensureExists = async (path, mask) => {
            const fs = require('fs');
            if (typeof mask != 'number') {
                mask = 0o777
            }
            fs.mkdirSync(path, {
                mode: mask,
                recursive: true
            });
        };
        const fetch = require('node-fetch')
        const config = require('../../config.json')
        const { MessageAttachment } = require('discord.js')
        const waitOn = require('wait-on')
        const fs = require('fs');
        const ytdl = require('ytdl-core');
        const exec = require('child_process').spawn
        const ffmpeg = require('ffmpeg-static')
        const path = require('path')
        const __root = path.resolve(__dirname, '..', '..', 'temp')
        ensureExists(__root)
        var url = args.join(' ').trim()
        const i = Date.now() + '.mp4'
        const o = Date.now() + '.mp3'
        if (url.startsWith('https://www.youtube.com/watch?v=')) {
            var info = await ytdl.getInfo(url)
            if (info.player_response && info.player_response.playabilityStatus.status == "OK") {
                if (info.videoDetails.lengthSeconds <= (8*60)+30) {
                    try {
                        message.channel.send('Downloading: ' + info.videoDetails.title)
                        ytdl.downloadFromInfo(info).pipe(fs.createWriteStream(path.join(__root, i)))
                        waitOn({
                            resources: [
                                path.join(__root, i),
                            ]
                        }).then(async () => {
                            message.channel.send('Converting: ' + info.videoDetails.title.trim() + '. Estimate time wait is: ' + ((8000 + info.videoDetails.lengthSeconds * 51)) + 's.')
                            exec(ffmpeg, ["-i", path.join(__root, i), path.join(__root, o)], {
                                cwd: __dirname,
                                shell: true,
                                stdio: 'inherit'
                            })

                            setTimeout(async () => {
                                const attachment = new MessageAttachment(path.join(__root, o), 'audio.mp3')
                                message.channel.send('Converted: ' + info.videoDetails.title + ':', attachment)
                                fs.unlinkSync(path.join(__root, i));
                                fs.unlinkSync(path.join(__root, o));
                            }, 8000 + info.videoDetails.lengthSeconds * 51)
                        }).catch((e) => { console.error(e) })
                    } catch (e) {
                        if (e) {
                            console.error('An unexpectted error occured:', e)
                            message.channel.send('An unexpectted error occured: ' + e)
                        }
                    }
                } else {
                    message.reply('This video is longer than 10min.')
                }
            } else {
                message.reply('This video does not exists, or unaccessable.')
            }
        } else {
            try {
                if (config.youtubeAPI != '') {
                    var ytapi = config.youtubeAPI
                    var res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(url)}&key=${ytapi}`, {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json'
                        },
                    })
                    res = await res.json()
                    if (res.items == []) {
                        message.channel.send(url + ' not found.')
                    } else {
                        url = `https://youtube.com/watch?v=${res.items[0].id.videoId}`
                        var info = await ytdl.getInfo(url)
                        if (info.player_response && info.player_response.playabilityStatus.status == "OK") {
                            if (info.videoDetails.lengthSeconds <= 600) {
                                try {
                                    message.channel.send('Downloading: ' + info.videoDetails.title)
                                    ytdl.downloadFromInfo(info).pipe(fs.createWriteStream(path.join(__root, i)))
                                    waitOn({
                                        resources: [
                                            path.join(__root, i),
                                        ]
                                    }).then(async () => {
                                        message.channel.send('Converting: ' + info.videoDetails.title.trim() + '. Estimate time wait is: ' + ((8000 + info.videoDetails.lengthSeconds * 51)) + `ms (${(8000 + info.videoDetails.lengthSeconds * 51) / 1000}s).`)
                                        exec(ffmpeg, ["-i", path.join(__root, i), path.join(__root, o)], {
                                            cwd: __dirname,
                                            shell: true,
                                            stdio: 'inherit'
                                        })

                                        setTimeout(async () => {
                                            const attachment = new MessageAttachment(path.join(__root, o), 'audio.mp3')
                                            message.channel.send('Converted: ' + info.videoDetails.title + ':', attachment)
                                            fs.unlinkSync(path.join(__root, i));
                                            fs.unlinkSync(path.join(__root, o));
                                        }, 8000 + info.videoDetails.lengthSeconds * 51)
                                    }).catch((e) => { console.error(e) })
                                } catch (e) {
                                    if (e) {
                                        console.error('An unexpectted error occured:', e)
                                        message.channel.send('An unexpectted error occured: ' + e)
                                    }
                                }
                            } else {
                                message.reply('This video is longer than 10min.')
                            }
                        }
                    }
                } else {
                    message.channel.send('Missing `youtubeAPI` in config.json.')
                }
            } catch (e) { console.error(e) }
        }
    }
}