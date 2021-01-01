const message = require("../event/message");

module.exports = (client,message) =>{
    if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply("Vous ne pouvez pas warn car vous n'avez pas les perms").catch()
    let dl = message.content.split(" ").slice(1)
    if(!dl ||isNaN(dl) || dl >=100 || dl<1)return message.reply("le nombre doit être entre 1 et 100")
    dlf = Number(dl)
    message.channel.bulkDelete(dlf +1,true).then(message.channel.send("je viens de suprimer"+dlf+"message")).catch(console.error)
}