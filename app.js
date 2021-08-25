const { Client, Collection, MessageEmbed } = require("discord.js");
const fs = require("fs");
const childProcess = require('child_process')
if (!fs.existsSync('./config.json')) {
  console.log('[Config Handlers]', "config.json doesn't exists. Attemping to create a new one...")
  fs.writeFileSync('./config.json', `{
    "autoUpdate": true,
    "token": "",
    "prefix": "!",
    "Admin": "",
    "osuAPI": {
      "client_id": "",
      "client_secret": "",
      "typeof client_id": "number",
      "typeof client_secret": "string"
    },
    "oauthv2link": ""
  }`)
}
if (!fs.existsSync('./database/data.json')) {
  fs.mkdirSync('./database', {
    mode: 0o777,
    recursive: true
  })
  console.log('[Data Handlers]', 'owo, data file not found.')
  fs.writeFileSync('./database/data.json', '{}')
}
var config = JSON.parse(fs.readFileSync('./config.json').toString());
const defaultconfig = {
  "autoUpdate": true,
  "token": "",
  "prefix": "!",
  "Admin": "",
  "osuAPI": {
    "client_id": "",
    "client_secret": "",
    "typeof client_id": "number",
    "typeof client_secret": "string"
  },
  "oauthv2link": ""
}
for (let a in defaultconfig) {
  if (config[a] == undefined) {
    console.log('[Config Handlers]', a, 'was not found in config.json. Adding with defautl value' + defaultconfig[a] + '...')
    config[a] = defaultconfig[a]
  }
  fs.writeFileSync('./config.json', JSON.stringify(config, null, 4))
}
var config = JSON.parse(fs.readFileSync('./config.json').toString());
const main = async () => {
  if (config.token != '') {
    const moment = require('moment');
    const ms = require('ms');
    const Timeout = new Collection();

    const client = new Client({
      disableEveryone: true
    });
    require('discord-buttons')(client);
    client.commands = new Collection();
    client.aliases = new Collection();
    client.categories = fs.readdirSync("./commands/");
    ['data', "command"].forEach(handler => {
      require(`./handlers/${handler}`)(client);
    });
    client.on('ready', () => {
      console.log(`Logged in as ${client.user.tag}!`);
      setInterval(() => {
        const statuses = [
          `github.com/hellsnakes/hellsnakebot`,
          `with ${client.guilds.cache.size} servers`,
          `with ${client.channels.cache.size} channels`,
          `with ${client.users.cache.size} users`,
          `HELLSNAKEBOT| ${config.prefix}help`,
          `osu!`,
        ]

        const status = statuses[Math.floor(Math.random() * statuses.length)]
        client.user.setActivity(status, { type: "PLAYING" })
      }, 60000)
    });
    client.on("message", async message => {
      const prefix = (config.prefix);
      if (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) {
        message.reply(`**Use ${config.prefix}help to display all commands available.**`);
      }
      if (message.content.startsWith(prefix)) {
        console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message.author.username} (${message.author.id}) issued command in ${message.channel.id}: ${message.content}`);
      } else {
        if (message.attachments.first() != undefined && message.content != '') {
          console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message.author.username} (${message.author.id}) messaged in ${message.channel.id}: ${message.content}`);
          console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message.author.username} (${message.author.id}) sent an attachment in ${message.channel.id}: ${message.attachments.first().url}`)
        } else if (message.attachments.first() != undefined && message.content == '') {
          console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message.author.username} (${message.author.id}) sent an attachment in ${message.channel.id}: ${message.attachments.first().url}`)
        } else if (message.attachments.first() == undefined && message.content != '') {
          console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message.author.username} (${message.author.id}) messaged in ${message.channel.id}: ${message.content}`);
        } else {
          if (message.embeds.length != 0) {
            let a = message.embeds[0]
            let embed = {}
            for (let b in a) {
              if (a[b] != null && (a[b] != [] && a[b].length != 0) && a[b] != {}) {
                embed[b] = a[b]
              }
            }
            console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message.author.username} (${message.author.id}) sent an embed in ${message.channel.id}: ${JSON.stringify(embed, null, 2)}`)
          }
        }
      }
      if (message.author.bot) return;
      if (!message.guild) return;
      if (!message.content.startsWith(prefix)) return;
      if (!message.member) message.member = await message.guild.fetchMember(message);
      const args = message.content.slice(prefix.length).trim().split(/ +/g);
      const cmd = args.shift().toLowerCase();
      if (cmd.length === 0) return;
      let command = client.commands.get(cmd);
      if (!command) command = client.commands.get(client.aliases.get(cmd));
      if (command) {
        if (command.run != undefined) {
          if (Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(`You are on a \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), { long: true })}\` cooldown.`)
          command.run(client, message, args);
          Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.timeout)
          setTimeout(() => {
            Timeout.delete(`${command.name}${message.author.id}`)
          }, command.timeout)
        } else return;
      }
    });
    if (!fs.existsSync('./database/xp.json')) {
      fs.mkdirSync('./database', {
        mode: 0o777,
        recursive: true
      })
      fs.appendFileSync('./database/xp.json', '{}')
    }
    const xpfile = require('./database/xp.json');
    client.on("message", function (message) {
      if (message.author.bot) return;
      if (client.data.levelconfig == undefined) {
        client.data.levelconfig = {};
        client.updateData();
      }
      if (client.data.levelconfig[message.author.id] == undefined) {
        client.data.levelconfig[message.author.id] = true
        client.updateData()
      }
      var addXP = Math.floor(Math.random() * 8) + 3

      if (!xpfile[message.author.id]) {
        xpfile[message.author.id] = {
          xp: 0,
          level: 1,
          reqxp: 100
        }

        fs.writeFile("./database/xp.json", JSON.stringify(xpfile), function (err) {
          if (err) console.log(err)
        })
      }

      xpfile[message.author.id].xp += addXP

      if (xpfile[message.author.id].xp > xpfile[message.author.id].reqxp) {
        xpfile[message.author.id].xp -= xpfile[message.author.id].reqxp
        xpfile[message.author.id].reqxp *= 1.25
        xpfile[message.author.id].reqxp = Math.floor(xpfile[message.author.id].reqxp)
        xpfile[message.author.id].level += 1

        let member = message.mentions.users.first() || message.author
        if (client.data.levelconfig[message.author.id] == true) {
          const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`${member.tag}`)
            .setDescription("You Are Now Level **" + xpfile[message.author.id].level + "**!")
            .setImage('https://emoji.gg/assets/emoji/9104-nekodance.gif')
          message.channel.send(embed).then(embed => { embed.delete({ timeout: 10000 }) })
        }
      }
      fs.writeFile("./database/xp.json", JSON.stringify(xpfile), function (err) {
        if (err) console.log(err)
      })
    });
    const distube = require('distube');
    client.distube = new distube(client, { searchSongs: true, emitNewSongOnly: true, leaveOnEmpty: true, leaveOnFinish: true, updateYouTubeDL: false })
    const status = (queue) => `Volume: \`${queue.volume}%\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
    client.distube
      .on("playSong", (message, queue, song) => {
        const embed = new MessageEmbed()
        .setTitle('<:headphones:879518595602841630> Started Playing')
        .setDescription(`[${song.name}](${song.url})`)
        .addField('**Views:**', song.views)
        .addField('<:like:879371469132562552>', song.likes)
        .addField('<:dislike:879371468817973299>', song.dislikes)
        .addField('**Duration:**', song.formattedDuration)
        .addField('**Status**', status(queue))
        .setThumbnail(song.thumbnail)
        .setColor("RANDOM")
        message.channel.send(embed)
      })
      .on('addSong', (message, queue, song) => {
         const embed = new MessageEmbed()
         .setTitle(`<:addsong:879518595665780746> Added song to queue`)
         .setDescription(`\`${song.name}\` - \`${song.formattedDuration}\` - Requested by ${song.user}`)
         .setColor("RANDOM")
        message.channel.send(embed);
      })   
      .on("playList", (message, queue, playlist, song) => message.channel.send(
        `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`,
      ))
      .on("addList", (message, queue, playlist) => message.channel.send(
        `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`,
      ))
      .on("searchResult", (message, result) => {
        let i = 0;
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
      })
      .on("searchCancel", (message) => message.channel.send(`***Searching canceled***`))
      .on('error', (message, e) => {
        message.channel.send(`An error encountered: ${e}`)
      })
      .on('empty', (message, queue) => {
        message.channel.send(`***Channel is empty. Leaving the channel***`)
      })
      .on('initQueue', (queue) => {
        queue.autoplay = false;
      });
    client.login(config.token);
  } else {
    console.error('[ERROR]', 'Please spectify a Discord bot token in config.json.')
    //eslint-disable-next-line no-unreachable
    process.exit(1)
  }
}
async function update() {
  if (config.autoUpdate == true) {
    if (fs.existsSync('./.git')) {
      //ensures that the bot was cloned by using git ./.git is in directory.
      console.log('[Updater]', 'Updating...')
      const child = childProcess.spawn('git', ['pull'])
      //ensure thats the bot run after update.
      child.on('close', async () => {
        //Ensuring thats new package are installed.
        console.log('[Updater]', 'Installing new package...')
        childProcess.execSync('npm i')
        console.log('[Updater]', 'Updated. Starting...')
        await main()
      })
    } else {
      console.log('[Updater]', './.git was not found in this directory. Skipping update...')
      await main()
    }
  } else {
    await main()
  }
}
update()
