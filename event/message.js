const { MessageEmbed } = require("discord.js");
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync');
const dbdb = new FileSync("../db.json")
const db = low(dbdb)

module.exports = (client ,message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(client.PREFIX)) {
    const commandBody = message.content.slice(client.PREFIX.length);
    const arguments = commandBody.split(' ');
    const command = arguments.shift().toLowerCase();
    if (client.commands.has(command)){
        client.help = new MessageEmbed
        client.embed_avatar = new MessageEmbed
        client.commands.get(command)(client,message, arguments, command)
    }else{
        if(command==="ping"){
            const timeTaken = Date.now() - message.createdTimestamp;
            message.reply(`Pong! \n Ce message a une latence de ${timeTaken}ms.`);
            return
        }if (message.content === client.PREFIX + 'stat'){
            message.channel.send (message.author.username + ' a envoyer un message et qui a pour identifient  '+ message.author.id );
            return
        };
        message.reply("t'as command n'existe pas")

        
    }
    }else{
        
        let msgauthorid = message.author.id
        if (!db.get('Infos_membre').find({ id: msgauthorid }).value()) {
            db.get("Infos_membre").push({ id: msgauthorid, xp: 1, niveau: 1, xp_p_niveau: 50 }).write()
            console.log('ça marche')
        }else{
            let userxpdb = db.get("Infos_membre").filter({ id: msgauthorid }).find("xp").value()
            let userxp = Object.values(userxpdb)
            let userniveaudb = db.get("Infos_membre").filter({ id: msgauthorid }).find("niveau").value()
            let userniveau = Object.values(userniveaudb)
            let userxp_p_niveaudb = db.get("Infos_membre").filter({ id: msgauthorid }).find("xp_p_niveau").value()
            let userxp_p_niveau = Object.values(userxp_p_niveaudb)
            let chiffre = [3, 4, 5, 6, 7]
            let index = Math.floor(Math.random() * (chiffre.length - 1) + 1)
            db.get('Infos_membre').find({ id: msgauthorid }).assign({ id: msgauthorid, xp: userxp[1] += chiffre[index] }).write()
            if (userxp[1] >= userxp_p_niveau[3]) {
                db.get('Infos_membre').find({ id: msgauthorid }).assign({ id: msgauthorid, xp: userxp[1] = 1 }).write()
                db.get('Infos_membre').find({ id: msgauthorid }).assign({ id: msgauthorid, niveau: userniveau[2] += 1 }).write()
                db.get('Infos_membre').find({ id: msgauthorid }).assign({ id: msgauthorid, xp_p_niveau: userxp_p_niveau[3] += 10 }).write()
                message.channel.send(`**gg ${message.author}vous ête passé nivau ${userniveau[2]}** \n il vous faut maintenant ${userxp_p_niveau[3]} pour level-up `)
            }
        }
    }
};
