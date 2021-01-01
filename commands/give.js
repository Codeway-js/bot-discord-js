const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync');
const dbdba = new FileSync("de.json")
const dbe = low(dbdba)

module.exports = (client, message) => {
    let msgauthorid = message.author.id
    const commandBody = message.content.slice(client.PREFIX.length);
    const arguments = commandBody.split(' ');
    let usermoneydb = dbe.get("Infos_membre").filter({ id: msgauthorid }).find("money").value()
    let usermoney = Object.values(usermoneydb)
    if (usermoney == null) { usermoney = 0 }
    let Mention = message.mentions.users.first()
    if (Mention == undefined) return message.reply(" mal mentioné il faut mettre la persoone puis l'argent")
    if (Mention == message.author) return message.reply("arrete de faire bug le serveur")
    let Mentionmoneydb = dbe.get("Infos_membre").filter({ id: Mention.id }).find("money").value()
    if (Mentionmoneydb == undefined) {
        dbe.get("Infos_membre").push({ id: Mention.id, money: 100 }).write()
        console.log('ça marche  a')
    }
    let somme = arguments[2]
    somme = parseInt(somme)
    Mentionmoneydb = dbe.get("Infos_membre").filter({ id: Mention.id }).find("money").value()
    let Mentionmoney = Object.values(Mentionmoneydb)
    if (Mentionmoney == null) { Mentionmoney = 0 }
    console.log(usermoney)
    console.log(Mentionmoney)
    console.log(somme)
    if (isNaN(somme)) return message.reply("somme de la  transaction mal mentioné")
    if (somme > usermoney[1]) return message.reply("tu n'as pas assez d'argent")
    dbe.get('Infos_membre').find({ id: msgauthorid }).assign({ id: msgauthorid, money: usermoney[1] -= somme }).write()
    dbe.get('Infos_membre').find({ id: Mention.id }).assign({ id: Mention.id, money: Mentionmoney[1] += somme }).write()
    message.channel.send(`${message.author.username} à donné ${somme} d'argi à ${Mention.username}`)

}