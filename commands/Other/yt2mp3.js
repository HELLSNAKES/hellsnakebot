/* eslint-disable no-unused-vars */
const ytdl = require('ytdl-core');
const concat = require('concat-stream')
const exec = require('child_process').spawn
const path = require('path')
const ps = require('promise-streams')
const ffmpeg = require('ffmpeg-static')
const fs = require('fs');
const { MessageAttachment } = require('discord.js');
const fetch = require('node-fetch')
const config = require('../../config.json')
/**
 * 
 * @param {stream.Readable} stream 
 * @returns 
 */
let concatStream = function concatStream(stream) {
    return new Promise(r => {
        stream.pipe(concat(r), { end: true });
    });
}
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
const __root = path.resolve(__dirname, '..', '..', 'temp')
ensureExists(__root)
const i = Date.now() + '.mp4'
const o = Date.now() + '.mp3'

module.exports = {
    name: "yt2mp3",
    category: "Other",
    description: "Get audio file from a video in https://youtube.com",
    timeout: 10000,
    usage: "[command + youtube link/search term]",
    run: async function yt2mp3Func(client, message, args, retry) {
        if (args.length > 0) {
            var url = args[0];
            if (ytdl.validateURL(url)) {
                var url = url
            } else {
                var q = args.join(' ')
                var api = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&key=${config.youtubeAPI}&q=${q}`
                var res = await fetch(api, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json'
                    }
                })
                var res = await res.json()
                var url = `https://www.youtube.com/watch?v=${res.items[0].id.videoId}`
            }
                try {
                    var info = await ytdl.getInfo(url);
                    console.log("Got video info from Youtube (for", message.author.id + ").");
                    var isLive = false;
                    var duration = 0;
                    if (typeof info.player_response != "object") {
                        console.log("ERROR ERROR ERROR ERROR ERROR");
                        console.log("Information data:", JSON.stringify(info, null, 4));
                        console.log("ERROR ERROR ERROR ERROR ERROR");
                    }
                    if (info.player_response && info.player_response.playabilityStatus.status == "OK") {
                        var itaglist = [];
                        for (var n in info.player_response.streamingData.formats) {
                            if (info.player_response.streamingData.formats[n].live) isLive = true;
                            if (info.player_response.streamingData.formats[n].approxDurationMs > duration)
                                duration = info.player_response.streamingData.formats[n].approxDurationMs;
                            itaglist.push(info.player_response.streamingData.formats[n].itag);
                        }
                        console.log("Supported itag:", JSON.stringify(itaglist));
                        if (duration > 600000) {
                            isLive = true;
                        }

                        if (!isLive) {
                            var mp3file = ytdl.downloadFromInfo(info);
                            var downloadPercent = 0;
                            mp3file.on("progress", function (chunk, downloaded, total) {
                                downloadPercent = (downloaded / total * 100);
                            });
                            var logDwl = setInterval(function () {
                                console.log("Downloading youtube video \"" + info.videoDetails.title + "\" for", message.author.id, "at", message.channel.id + ":", Math.floor(downloadPercent) + "%");
                                if (Math.floor(downloadPercent) == 100) {
                                    clearInterval(logDwl);
                                    console.log("Finished downloading.");
                                }
                            }, 3111);
                            setTimeout(function () {
                                if (downloadPercent < 1) {
                                    mp3file.destroy();
                                    clearInterval(logDwl);
                                    console.log("Timed out while downloading data (for", message.author.id + ").", "Retrying...");
                                    message.channel.send(yt2mp3Func(client, message, args, true));
                                }
                            }, 20000);

                            mp3file.on("error", function (err) {
                                mp3file.destroy();
                                message.channel.send("Error while downloading \"" + info.videoDetails.title + "\": " + err);
                            });

                            ps.collect(mp3file).then(async function (mp3content) {
                                fs.writeFileSync(path.join(__root, i), mp3content);
                                if(fs.existsSync(path.join(__root, i))) {
                                message.channel.send('Converting: ' + info.videoDetails.title)
                                var p = exec(ffmpeg, ["-i", path.join(__root, i), "-vn", "-ac", "2", "-ab", "128k", "-acodec", "libmp3lame", "-y", path.join(__root, o)]);

                                // eslint-disable-next-line no-inner-declarations
                                function r(error, stdout, stderr) {
                                    if (error) {
                                        message.channel.send('An unexpected error occured: ' + error)
                                        fs.unlinkSync(path.join(__root, i))
                                    }
                                    const attachment = new MessageAttachment(fs.createReadStream(path.join(__root, o)))
                                    message.channel.send('Converted: ' + info.videoDetails.title + ':', attachment)
                                    fs.unlinkSync(path.join(__root, i))
                                    fs.unlinkSync(path.join(__root, o))
                                }

                                let stdout = concatStream(p.stdout);
                                let stderr = concatStream(p.stderr);
                                p.on("close", async function (code, signal) {
                                    if (code != 0) {
                                        let pstdout = await stdout;
                                        let pstderr = await stderr;
                                        return r(pstderr, pstdout, pstderr);
                                    }
                                    r(null, "", "");
                                });

                                p.on("error", function (err) {
                                    r(err, "", "");
                                });
                            }
                            }).catch(function (err) {
                                message.channel.send("Errored while downloading \"" + info.videoDetails.title + "\": " + err)
                            });
                                if (!retry) {
                                    message.channel.send("Downloading \"" + info.videoDetails.title + "\"...")
                                }
                            
                        } else {
                            message.channel.send("Cannot process that video (Live Stream or length longer than 10 minutes?).")
                        }
                    
                    } else {
                        message.channel.send("This video does not exist, or not accessible.")
                    }
                
                } catch (ex) {
                    message.channel.send("Error: " + ex.message)
                }
            
        } else {
            message.channel.send("Missing youtube link or search terms!")
        }
    }
}
