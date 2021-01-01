const ytdl = require("ytdl-core")
var list = []
let all_list =""
module.exports = (client,message)=>{
    for(i=0;i<list.length;i++){
        all_list = all_list +" "+list[i]
    }
    if(message.content ==".play playlist") return message.reply(all_list)
    if(message.member.voice.channel){
        let args = message.content.split(" ")
        
            if(list.length>0){
                list.push(args[0])
                message.reply('vidéo ajouter')
            }
            else{
                list.push(args[0])
                message.reply('vidéo ajouté')
                message.member.voice.channel.join().then(connection =>{
                    playMusic(connection);
                    connection.on("disconect",()=>{list=[]})                    
                }).catch(err =>{message.reply('erreur de connection'+err)})
            }
        
    }
    else return message.reply("vous devez vous connecter")
}
function playMusic(connection){
    let dispacher = connection.play(ytdl(list[0], { quality : "highestaudio"}))
    dispacher.on("finish",()=>{
        list.shift()
        dispacher.destroy()
        if(list.length >0){
            playMusic(connection)
        }
        else{
            connection.disconnect()
        }
    
    })
    dispacher.on("error",err =>{
        dispacher.destroy()
        connection.disconnect()    
    })
}