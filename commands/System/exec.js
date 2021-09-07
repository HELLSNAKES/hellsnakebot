const childProcess = require('child_process');
const { Admin } = require('../../config.json');

module.exports = {
  name: "exec",
  category: "System",
  description: "Executes a process command.",
  usage: "[command] + [process command]",
  author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
  run: async (client, message, args) => {
    if(message.author.id !== Admin) 
    return message.channel.send('Insufficient permission!!')
    if (!args[0])
    return message.channel.send('Usage [command] + [process command]');
     childProcess.exec(args.join(' '), {},
        (err, stdout, stderr) => {
            if (err) return message.channel.send('```' + err.message + '```');
            message.channel.send('```' + stdout + '```');
      })
   }    
}
