console.log('hello world')
const { DiscordAPIError } = require("discord.js");
const { Client, Collection } = require("discord.js")
const { TOKEN, PREFIX } = require("./config.json");
const client = new Client({ disableEveryone: true });
client.PREFIX = PREFIX;
const Discord = require('discord.js');
console.log("init discord js end")
client.login(process.env.TokenBot)
