//This command is for admins/staff for when they need to mark a Player as Whitelisted or Approved
const discord = require("discord.js")
exports.run = (client, message, args) => {

    let awaiting = message.guild.roles.cache.find(r => r.name === 'Awaiting Whitelist');//declaring the awaiting whitelist role
    let approvedrole = message.guild.roles.cache.find(r => r.name === 'Whitelisted');//declaring the whitelisted role

    let mentionedUser = message.mentions.members.first()//declaring the mentioned user
    if (!message.member.hasPermission('ADMINISTRATOR')) {//checking for admin perms
    	return
    }
    if (message.member.hasPermission('ADMINISTRATOR')) {//if this user has admin perms it will start the command
        if(!mentionedUser) return message.reply('Please mention a user')//checking if a user was mentioned 

        message.channel.send(`${mentionedUser}'s Whitelist request has been set as approved`)// if a user is mention it will send this message


        mentionedUser.roles.remove(awaiting)// removes the awaiting role from person
        mentionedUser.roles.add(approvedrole)// adds the whitelisted role

        
        var currentdate = new Date(); //delares the date module
        let approved = new discord.MessageEmbed()//delares a new discord Embed as "approved"
        .setTitle(`Your Whitelist Request Has Been Approved!`)//embed title
        .addField("Approved By", message.author)//first embed field
        .addField("Approvde On", `${currentdate}`)//second emed field
        mentionedUser.send(approved)//dms the mentioned user the approved embed to alert them   
     }

 


}