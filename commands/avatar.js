
module.exports = (client, message) => {
    if (message.content.startsWith(client.PREFIX + 'avatar')) {
        client.embed_avatar
            .setTitle("voici l'avatar de " + message.author.username)
            .setColor("#1f00b8")
            .setImage(message.author.displayAvatarURL())
            .setTimestamp()
            .setFooter("request by " + message.author.username, 'https://discord.com/assets/0e291f67c9274a1abdddeb3fd919cbaa.png')
            .setThumbnail('https://discord.com/assets/0e291f67c9274a1abdddeb3fd919cbaa.png')
            .setURL('https://www.youtube.com')
        message.channel.send(client.embed_avatar)
    }
}