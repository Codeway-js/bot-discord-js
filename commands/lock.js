const fs = require('fs')

module.exports = (client,message) => {
    client.de = require('../dbe.json')
    console.log(client.de)
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply("t'as pas les perm'")
    const chanel =message.mentions.channels.first() ||message.channel
    if(client.de.lockedChanels.includes(chanel.id)) return message.reply('le salon est déjo lock')
    client.de.lockedChanels.push(chanel.id)
    fs.writeFileSync('commands/de.json',JSON.stringify(client.de))
    message.channel.send('le salon a été lock')
}