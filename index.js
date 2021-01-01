const { DiscordAPIError } = require("discord.js");
const { Client, Collection } = require("discord.js")
const { TOKEN, PREFIX } = require("./config.json");
const client = new Client({ disableEveryone: true });
client.PREFIX = PREFIX;
const Discord = require('discord.js');
client.commandsliste = ["kick","ban","avatar","8ball","mute","help","warn","clear","play","tempban","give","money","rank"]
client.commands = new Collection();
client.commands.set("kick", require("./commands/kick.js"));
client.commands.set("ban", require("./commands/ban.js"));
client.commands.set("avatar", require("./commands/avatar.js"));
client.commands.set('8ball', require("./commands/8ball.js"))
client.commands.set('mute', require("./commands/mute.js"))
client.commands.set('help', require("./commands/help.js"))
client.commands.set('warn', require("./commands/warn.js"))
client.commands.set('clear', require("./commands/clear.js"))
client.commands.set('play', require("./commands/music.js"))
client.commands.set('tempban', require("./commands/tempmute.js"))
client.commands.set("give", require("./commands/give.js"));
client.commands.set("money", require("./commands/money.js"));
client.commands.set("rank", require("./commands/rank.js"));
client.commands.set("lock", require("./commands/lock.js"));
client.commands.set("unlock", require("./commands/unlock.js"));
client.on("ready", () => require("./event/ready.js")(client));
client.on('message', message => require("./event/message.js")(client, message))
client.on('guildMemberAdd', member => require("./event/guildMemberAdd.js")(client, member))
// low dbe
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync');
const dbdba = new FileSync("commands/de.json")
const dbe = low(dbdba)
dbe.defaults({ Infos_membre: [] }).write()
// fs
const fs = require('fs')
client.de = require('./dbe.json')
client.on('message', async message => {let msgauthorid = message.author.id;
    if (message.author.bot) return;
    if (!dbe.get('Infos_membre').find({ id: msgauthorid }).value()) {
        dbe.get("Infos_membre").push({ id: msgauthorid, money: 1 }).write();
        console.log('ça marche  a');
    
    };
    if(!message.member.hasPermission('MANAGE_CHANNELS') && client.de.lockedChanels.includes(message.channel.id)) return message.delete()
})



client.login(process.env.TokenBot);
client.on("error", console.error)
client.on("warn", console.warn)
