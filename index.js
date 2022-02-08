const Discord = require("discord.js");
const fetch = require("node-fetch-commonjs")
const keepAlive = require("./server")

const mySecret = process.env['TOKEN'];
const client = new Discord.Client({
  intents: ["GUILDS","GUILD_MESSAGES"]
  })

function getJokes(){
  return fetch("https://v2.jokeapi.dev/joke/Dark?type=twopart").then(res=>{
    return res.json()
  }).then(data =>{
    return data.setup + "\n"+ data.delivery
  })
}

function getInsults(){
  return fetch("https://insult.mattbas.org/api/insult.json").then(res=>{
    return res.json()
  }).then(data =>{
    return data.insult
  })
}
/*

fetch("https://insult.mattbas.org/api/insult.json").then(function(resp){
    return resp.json();
})
.then(function(data){
  console.log(data)
})
{


}
*/


client.on("ready", ()=>{
  console.log(`Logged in as ${client.user.tag}`)
})
  

client.on("message",msg=>{
if(msg.author.bot) return

if(msg.content === "!komedy"){
  const user = msg.author;
  getJokes().then(quote=> msg.reply(quote))
}


if(msg.content === "!insultme"){
   getInsults().then(quote=> msg.reply(quote))
}


  if(msg.content === "ping"){
     msg.reply("pong")
  }
   

})


keepAlive()

client.login(mySecret);

