const { Client, Collection, MessageEmbed } = require("discord.js");
const fs = require("fs");

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
var config = JSON.parse(fs.readFileSync('./config.json').toString());

const configvalue = ['autoUpdate', 'token', 'prefix', 'Admin', 'osuAPI', 'youtubeAPI']
configvalue.forEach(async (a) => {
  if(config[a] == undefined) {
    console.log(a, 'was not found in config.json. Adding with default value...')
    if(a == 'autoUpdate') {
      config.autoUpdate = true
    }
    if(a == 'token' ) {
      config.token = ''
    }
    if(a == 'youtubeAPI') {
      config.youtubeAPI = ''
    }
    if( a == 'Admin' ) {
      config.Admin = ''
    }
    if(a == 'prefix') {
      config.prefix = '!'
    }
    if(a == 'osuAPI') {
      config.osuAPI = {
        "client_id": "",
        "client_secret": "",
        "typeof client_id": "number",
        "typeof client_secret": "string"
      }
    }
    await fs.writeFileSync('./config.json', JSON.stringify(config, null, 4),{
      mode: 0o666,
      recursive: true
    })
  }
})

const fetch = require('node-fetch');
const moment = require('moment');
const ms = require('ms');
const Timeout = new Collection();
let skip = false
const childProcess = require('child_process')
async function update() {
  if (require('./config.json').autoUpdate == true) {
    var package = await fetch('https://raw.githubusercontent.com/HELLSNAKES/hellsnakebot/main/package.json')
    package = await package.json()
    if (require('./package.json').version.toString() != package.version.toString()) {
      console.log('New update avaliable. Updating via git...')
      childProcess.spawn('git', ['pull'], {
        stdio: 'inherit'
      })
    }
  }
}
update()
const client = new Client({
  disableEveryone: true
});
require('discord-buttons')(client);
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(`HELLSNAKEBOT | Prefix ${config.prefix} `, { type: 'PLAYING' });
});
client.on("message", async message => {
  const prefix = (config.prefix);
  if (message.content.startsWith(prefix)) {
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message.author.username} (${message.author.id}) issued command in ${message.channel.id}: ${message.content}`);
  } else {
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message.author.username} (${message.author.id}) messaged in ${message.channel.id}: ${message.content}`);
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
if (!skip) {
  client.login(config.token);
}