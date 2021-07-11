const { Admin } = require('../../config.json');

module.exports = {
  name: "reload",
  category: "System",
  description: "Reload command",
  usage: "[command] + [category] + [command]",
  run: async (client, message, args) => {
    if(message.author.id !== Admin) return message.channel.send('Insufficient permission!!')
    if (!args[0]) return message.channel.send('Give a category');
    if (!args[1]) return message.channel.send('Give a command');
   
    let category = args[0].toLowerCase();
    let command = args[1].toLowerCase();
    
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