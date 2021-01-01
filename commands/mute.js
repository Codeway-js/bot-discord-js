module.exports =(client,message) =>{
    if(message.member.hasPermission('ADMINISTRATOR')){
        let umute = message.mentions.members.first()
        if (umute == undefined) return
        umute.roles.add("656188111675457576")
        message.reply(umute+'a été mute correctement')
    }
}