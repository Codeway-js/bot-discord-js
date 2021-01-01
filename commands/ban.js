const message = require("../event/message")

module.exports= (client,message)=>{
if (message.content.startsWith(client.PREFIX + 'ban')){
    console.log('ban')
    if(message.author.bot)return
    //définis l'utilisateur à banir et sa mention
    let user =message.mentions.members.first()
    let reason = message.content.split(" ").slice(1).join(" ").slice(23)
    //vérifi si l'utilisateur peut banir  
    if(user.permissions.has("ADMINISTRATOR")) return message.reply("Vous ne pouvez pas le ban car il a les perm admin") 
    if(!message.member.permissions.has("ADMINISTRATOR"))return message.reply("Vous ne pouvez pas ban car vous n'avez pas les perms").catch()
    if(!user)return message.reply("Veuillez mentionnez une personne ex: _ban @user raison_");
    if(user.id == message.author.id)return message.reply("Vous ne pouvez pas vous auto-ban");
    if(user.bannable==false) return message.channel.send('vous pouvez pas ban ce membre');
    user.ban({reason})
    message.channel.send(`${user.displayName} a été ban par ${message.author.username} pour la raison ${reason}`);
}
}