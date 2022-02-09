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


function getCats(){
  return fetch("https://some-random-api.ml/img/cat").then(res=>{
    return res.json()
  }).then(data =>{
    return data.link
  })
}

function getCatFacts(){

  return fetch("https://some-random-api.ml/facts/cat").then(res=>{
    return res.json()
  }).then(data =>{
    return data.fact
  })
}



function getMemes(){

  return fetch("https://some-random-api.ml/meme").then(res=>{
    return res.json()
  }).then(data =>{
    return data.image
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
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setActivity('!help for help');

})
  

client.on("message",msg=>{
  if(msg.author.bot) return

  if(msg.content === "!komedy"){
    const user = msg.author;
    getJokes().then(quote=> msg.reply(quote))
  }



  if(msg.content === "!billu"){

    getCats().then(quote=>{
      const attachment = new Discord.MessageAttachment(quote+'.jpg');
      console.log(quote);
      

    getCatFacts().then(quote=>{
      const mew = quote;
      const user = msg.author; 

      msg.channel.send({content:`<@${user.id}>\n`+mew, files: [attachment]});
      console.log(mew);
    });
    
    } )

  }


  if(msg.content==="!meme"){


    getMemes().then(quote=>{
        const mew = quote;
        const user = msg.author; 
        const attachment = new Discord.MessageAttachment(quote);

        msg.channel.send({content:`<@${user.id}>\n`+'Here is your dopamine', files: [attachment]});
        
      });

  }



  if(msg.content === "!insultme"){
    getInsults().then(quote=> msg.reply(quote))
  }


  if(msg.content === "ping"){
      msg.reply("pong")
  }

  if(msg.content === '!help'){

      msg.reply("**Type**\n**!komedy** for some dark jokes\n**!meme** for some rotten memes\n**!billu** for some cute cats\n**!insultme** for some pure trash\nHave fun");

  }
   

})


keepAlive();

client.login(mySecret);

