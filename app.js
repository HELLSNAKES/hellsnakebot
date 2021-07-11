const { Client, Collection } = require("discord.js");
const fs = require("fs");
if (!fs.existsSync('./config.json')) {
  console.log("config.json doesn't exists. Attemping to create a new one...")
  fs.writeFileSync('./config.json', `{
    "token": "",
    "prefix": "",
    "Admin": "",
    "osuAPI": {
      "client_id": "",
      "client_secret": "",
      "typeof client_id": "number",
      "typeof client_secret": "string"
    }
  }`)
}
const config = require("./config.json");
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
  if(Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(`You are on a \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long : true})}\` cooldown.`)
    command.run(client, message, args);
    Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.timeout)
    setTimeout(() => {
      Timeout.delete(`${command.name}${message.author.id}`)
    }, command.timeout)
});

client.login(config.token);