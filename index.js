const Discord = require("discord.js");
const fetch = require("node-fetch-commonjs")

const mySecret = process.env['TOKEN'];
const client = new Discord.Client({
  intents: ["GUILDS","GUILD_MESSAGES"]
  })

function getJokes(){
  return fetch("https://zenquotes.io/api/random").then(res=>{
    return res.json()
  }).then(data =>{
    return data[0]["q"] + "-" + data[0]["a"]
  })
}








client.on("ready", ()=>{
  console.log(`Logged in as ${client.user.tag}`)
})
  

client.on("message",msg=>{
if(msg.author.bot) return

if(msg.content === "$shoot"){
  getJokes().then(quote=> msg.channel.send(quote))
}


  if(msg.content === "ping"){
     msg.reply("pong")
  }
   

})
client.login(mySecret);

