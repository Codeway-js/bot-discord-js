module.exports = (client, message) => {
    client.help
        .setTitle('les commandes sont:')
        .addFields({ name: "les commande de fun:", value: '`8ball` `avatar` `money` `give`' })
        .addFields({ name: "les commandes de modération:", value: "`ban` `kick` `mute` `tempban` `warn`" })
        .addFields({ name: "les commandes utile:", value: "`play` `play playlist`" })
        .setTimestamp()
    message.channel.send(client.help)
}