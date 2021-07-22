const { Client, Collection, MessageEmbed } = require("discord.js");
const fs = require("fs");
const childProcess = require('child_process')
if (!fs.existsSync('./config.json')) {
  console.log("config.json doesn't exists. Attemping to create a new one...")
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
    "youtubeAPI": ""
  }`)
}
if (!fs.existsSync('./database/data.json')) {
  fs.mkdirSync('./database', {
    mode: 0o777,
    recursive: true
  })
  console.log('owo, data file not found.')
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
  "youtubeAPI": ""
}
for (let a in defaultconfig) {
  if (config[a] == undefined) {
    console.log(a, 'was not found in config.json. Adding with defautl value' + defaultconfig[a] + '...')
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
        `HELLSNAKEBOT| ${config.prefix}help`,
        `osu!`,
      ]

      const status = statuses[Math.floor(Math.random() * statuses.length)]
      client.user.setActivity(status, { type: "PLAYING" })
    }, 600000)
  });
  client.on("message", async message => {
    const prefix = (config.prefix);
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
      } else;
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
    if (command)
      if (Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(`You are on a \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), { long: true })}\` cooldown.`)
    command.run(client, message, args);
    Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.timeout)
    setTimeout(() => {
      Timeout.delete(`${command.name}${message.author.id}`)
    }, command.timeout)
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

      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`${member.tag}`)
        .setDescription("You Are Now Level **" + xpfile[message.author.id].level + "**!")
        .setImage('https://emoji.gg/assets/emoji/9104-nekodance.gif')
      message.channel.send(embed).then(embed => { embed.delete({ timeout: 10000 }) })

    }
    fs.writeFile("./database/xp.json", JSON.stringify(xpfile), function (err) {
      if (err) console.log(err)
    })
  });
  const distube = require('distube');
  client.distube = new distube(client, { searchSongs: false, emitNewSongOnly: true, leaveOnEmpty: true, leaveOnFinish: false ,updateYouTubeDL: false })
  client.distube
    .on('playSong', (message, queue, song) => message.channel.send(
      `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`,
    ))
    .on('addSong', (message, queue, song) => message.channel.send(
      `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`,
    ))
    .on('error', (message, e) => {
      message.channel.send(`An error encountered: ${e}`)
    })
    .on('empty', (message, queue) => {
      message.channel.send(`***Channel is empty. Leaving the channel***`)
    });

    client.login(config.token);
  } else {
    console.error('[ERROR]','Please spectify a Discord bot token in config.json.')
    //eslint-disable-next-line no-unreachable
    process.exit(1)
  }
}
async function update() {
  if (config.autoUpdate == true) {
    console.log('[Git]', 'Updating...')
    const child = childProcess.spawn('git', ['pull'], {
      stdio: 'inherit'
    })
    //ensure thats the bot run after update.
    child.on('close', async () => {
      await main()
    })
  } else {
    await main()
  }
}
update()
