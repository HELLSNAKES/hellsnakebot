const Discord = require("discord.js")

module.exports = {
    name: "banner",
    category: "Utility",
    description: "Get user banner",
    usage: "banner [mention]",
    run: async(client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;
        async function getUserBannerUrl(userId) {
            const user = await client.api.users(userId).get();
            return user.banner ? `https://cdn.discordapp.com/banners/${userId}/${user.banner}?size=512` : null;
        }
        const bannerUrl = await getUserBannerUrl(member.id, { size: 4096 });
        if (bannerUrl) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`${member.user.username}'s banner`)
                .setColor("RANDOM")
                .setImage(bannerUrl);
            message.channel.send(embed);
        } else {
            message.channel.send("You/This user don't have nitro or didn't set a banner")}
}}