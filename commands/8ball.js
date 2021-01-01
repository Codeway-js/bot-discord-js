module.exports = (client,message, arguments) => {
    let all_message = ["hein?","mouais","bien sur :sweat_smile:","ch'ai pas moi"] 
    let messsage = arguments.join(" ")
    if(!message.content.endsWith("?")) return message.reply("il faut **un point d'interogation** à la fin d'une question!")
    let message_modif = messsage.split("?")
    let randomme = Math.floor(Math.random() * Math.floor(all_message.length))
    message.reply(message_modif+'\n'+all_message[randomme])
}