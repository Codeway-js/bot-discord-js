module.exports= (client,message)=>{
    let User = message.mentions.users.first()
    let user =message.mentions.members.first()
    let time = message.content.split(" ").slice(2)
    let reason = message.content.split(" ").slice(3)
    if(!reason || !time || !User) return message.reply("msg")
    if(User.id == message.author.id) return message.reply("auto-mute")
    message.channel.send(`${User.username} a été temp mute par ${message.author.username} pour la raison ${reason}`);
    user.ban({reason})
    setTimeout(()=>{
        message.guild.members.unban(User)
    }, time[0]*3600)
}