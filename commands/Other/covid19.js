const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name : 'covid',
    category: "Other",
    description: "Covid19 search",
    usage: "[command] + [countries]",
    run: async(client, message, args) => {
		 const countries = args.join(" ");
         if(!countries) return message.channel.send('Usage [command]+[countries]')
         const url = `https://corona.lmao.ninja/v2/countries/${countries}`
         let response
           try{
               response = await fetch(url).then(res => res.json())
           }
           catch(e) {
               return message.reply('An Error Occured, Try Again Later.')
           }
           const embed = new MessageEmbed()
           .setTitle(`COVID-19 Stats for **${response.country}**`)
           .setColor("RANDOM")
           .setThumbnail(response.countryInfo.flag)
           .addField('Total Cases', response.cases.toLocaleString())
           .addField('Total Deaths', response.deaths.toLocaleString())
           .addField('Total Recovered', response.recovered.toLocaleString())
           .addField('Active Cases', response.active.toLocaleString())
           .addField('Critical Cases', response.critical.toLocaleString())
           .addField('Todays Deaths', response.todayDeaths.toLocaleString())
           .addField('Today Recoveries', response.todayRecovered.toLocaleString())
           message.channel.send(embed)
       }
}