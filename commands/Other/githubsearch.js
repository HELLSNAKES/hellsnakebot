const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch') 

module.exports = {
    name: "githubsearch",
    category: "Other",
    description: "Info user github",
    usage: "[command] + [user]",
    run: async(client, message, args) => {
      const user = args.join(' ')
      if(!user) return message.channel.send('Invalid user.')
      const url = `https://api.github.com/users/${user}`
      let response
        try{
            response = await fetch(url).then(res => res.json())
        }
        catch(e) {
            return message.reply('An Error Occured, Try Again Later.')
        }
        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`${response.login}`)
        .setURL(response.html_url)
        .setThumbnail(response.avatar_url)
        .setDescription(response.bio ? response.bio : 'No Bio')
        .addField('Public Repositories:', response.public_repos.toLocaleString())
        .addField('Followers:', response.followers.toLocaleString())
        .addField('Following:', response.following.toLocaleString()) 
        .addField('Company:', response.company ? response.company : 'No Company')
        .addField('Location:', response.location ? response.location : 'No Location')
        message.channel.send(embed)
    }
}