/* 


  MC Whitelist Bot For The Velocity MC Server
  Made By Lula#5183
  Might release source on github

    
*/
//identifying modules
const discord = require("discord.js")//discord api
const client = new discord.Client();
const config = require("./cfg/config.json")//config file with bot token
const Enmap = require("enmap");
const fs = require("fs");

//command handler (very simple)
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
    });
  });
  
  client.commands = new Enmap();
  
  fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./commands/${file}`);
      let commandName = file.split(".")[0];
      console.log(`loading "${commandName}"`);
      client.commands.set(commandName, props);
    });
});


client.login(config.token);//bot logging in
