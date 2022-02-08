const Discord = require("discord.js");

const mySecret = process.env['TOKEN'];
const client = new Discord.Client({
  intents: ["GUILDS","GUILD_MESSAGES"]
  })

  client.on("ready", ()=>{
    console.log('Logged in as ${client.user.tag}')
  })
  client.login(mySecret);

