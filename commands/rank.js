
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync');
const dbdb = new FileSync("../db.json")
const db = low(dbdb)
module.exports = (client, message)=> {
    let msgauthorid = message.author.id
    if (message.content == client.PREFIX + "rank") {
        let userxpdb = db.get("Infos_membre").filter({ id: msgauthorid }).find("xp").value()
        let userxp = Object.values(userxpdb)
        let niveau = userxp[2]
        message.reply('vous avez ' + niveau + ' niveaux')

    }
}