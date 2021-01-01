const Discord = require('discord.js')
const client = new Discord.Client({DisableEveryone: true})

client.on('ready',async()=>{
    client.user.setActivity(" ENCORE UN NOUVEAU BOT")
})
client.login(process.env.TokenBot)