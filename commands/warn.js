// low db
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const dbdb = new FileSync("dw.json")
const db = low(dbdb)
db.defaults({ Infos_membre: [] }).write()
module.exports = (client, message) => {
    if (message.author.bot) return
    if (message.content == ".warn mes warn") {
        let userwarndb = db.get("Infos_membre").filter({ id: message.author.id }).find("warn").value()
        if (userwarndb == undefined) return message.reply("tu n'as pas de warn")
        let userwarn = Object.values(userwarndb)
        message.reply(userwarn[1])
    }
    //définis l'utilisateur à banir et sa mention
    let User = message.mentions.users.first()
    let reason = message.content.split(" ").slice(1).join(" ").slice(23)
    //vérifi si l'utilisateur peut banir     
    if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply("Vous ne pouvez pas warn car vous n'avez pas les perms").catch()
    if (!User) return message.reply("Veuillez mentionnez une personne ex: _warn @user raison_");
    if (User.id == message.author.id) return message.reply("Vous ne pouvez pas vous auto-ban");
    if (User.bannable == false) return message.channel.send('vous pouvez pas warn ce membre');
    
        let userwarndb = db.get("Infos_membre").filter({ id: User.id }).find("warn").value()
        if (userwarndb == undefined) {
            db.get("Infos_membre").push({ id: User.id, warn: 0 }).write()
            console.log('ça marche  a')
        }

        userwarndb = db.get("Infos_membre").filter({ id: User.id }).find("warn").value()
        console.log(userwarndb)
        let userwarn = Object.values(userwarndb)
        if (userwarn[1] == 0) {
            db.get("Infos_membre").push({ id: user.id, warn: 1 }).write()
            user.send("tu as 1 warn")
        }

        if (userwarn[1] == 1) {
            db.get('Infos_membre').find({ id: user.id }).assign({ id: user.id, warn: 2 }).write()
            user.send('tu as 2 warn')

        }
        if (userwarn[1] == 2) {
            reason = "trop de warn"
            user.ban({ reason })
            db.get('Infos_membre').find({ id: user.id }).assign({ id: user.id, warn: 0 }).write()
        }
    
    message.channel.send(`${user.displayName} a été warn par ${message.author.username} pour la raison ${reason}`);

}