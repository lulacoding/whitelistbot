// this command is for when someone wants to be whitelisted on the server


const discord = require("discord.js")

exports.run = (client, message, args) => {
    //gathering the Role
    let role = message.guild.roles.cache.find(r => r.name === 'Awaiting Whitelist');//declaring the awaiting whitelist role
    //checking if person already has the role
    if (message.member.roles.cache.some(role => role.name === 'Awaiting Whitelist')) {//checking if person already has the role
        message.reply("Sorry but you Already Have a Pending Whitelist Request")
        return 
    }
    
    if (message.channel.id != 'whitelist channel id') {
        return//checking if the command was executed in the right channel
    }
    
    if (!args[0]) return message.reply('Please Mention Your Minecraft Username')//checking if a username was mentioned
    
    if (args) message.reply(`Added Username \`${args}\` To the Whitelist Requests `)//if all is fine and a user name is entered it will run this command

    let requesteduser = message.author//delcares the message author as "requesteduser"
    let adminembed = new discord.MessageEmbed()//delares a new discord Embed as "adminembed"
    .setTitle(`${requesteduser.username}'s Whitelist Request`)//embed title
    .addField("Discord User", requesteduser)//first field
    .addField("Requested Username", `\`${args}\``)//second field

    message.member.roles.add(role);//adds the requesting user a awaiting role
    message.member.setNickname(args[0])
    
    client.channels.cache.get(`staff channel id `).send(adminembed).catch()//sends the "adminembed" alert

}