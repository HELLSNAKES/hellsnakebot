const { Admin } = require('../../config.json');

module.exports = {
  name: "reload",
  category: "System",
  description: "Reload command",
  usage: "[command] + [category] + [command]",
  author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
  run: async (client, message, args) => {
    if(message.author.id !== Admin) return message.channel.send('Insufficient permission!!')
    if (!args[0]) return message.channel.send('Give a command');
    let command = args[0].toLowerCase();
    var commandinfo = client.commands.get(command);
    var category = commandinfo.category
    
    try {
        delete require.cache[require.resolve(`../../commands/${category}/${command}.js`)];
        client.commands.delete(command);

      const pull = require(`../../commands/${category}/${command}.js`);
      client.commands.set(command, pull);
      return message.channel.send(`Reloaded **${command}**`);
    } catch (error) {
      return message.channel.send(`Error reloading **${command}**: \`${error.message}\``)
    }
  }    
}
