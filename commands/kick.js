module.exports = (client, message) =>{
    console.log ('kick')
if(message.content.startsWith(client.PREFIX+'kick')){
    console.log('kick')
    if (message.author.bot) return
    console.log('kick')
    if(message.member.hasPermission("ADMINISTRATOR")){
        let User =message.mentions.users.array()[0]
        let reason = message.content.split(" ").slice(1).join(" ").slice(23)
        if (!reason||!User) return message.reply('Vous avez oublier de mettre la raison ou la mention, \n format : **kick @user <raison>**')
        if (User.id == message.author.id) return message.reply("vous pouvez pas vous auto-kick")
        console.log('kick a')
        message.channel.send(message.author.username+" vient de kick "+ User.username+" pour la raison "+reason)
        console.log('kick v')
        message.guild.member(User).kick(reason)
    }
}
}