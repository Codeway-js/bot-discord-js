const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync');
const dbdba = new FileSync("de.json")
const dbe = low(dbdba)

module.exports = (client, message)=>{
    let msgauthorid = message.author.id
    let usermoneydb = dbe.get("Infos_membre").filter({ id: msgauthorid }).find("money").value()
    if(usermoneydb == undefined){
        dbe.get("Infos_membre").push({ id: msgauthorid, money: 1 }).write()
        usermoneydb = dbe.get("Infos_membre").filter({ id: msgauthorid }).find("money").value()
        console.log("ça marche argent fichier séparer "+usermoneydb)
    }
    let usermoney = Object.values(usermoneydb)
    message.reply('tu a '+ usermoney[1]+' argi')
    
}