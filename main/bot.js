// Discord Declarate

const Discord = require("discord.js");
const client = new Discord.Client();


// Token

const token = "";

// MYSQL

const mysql = require('mysql'); // Implement

var con = mysql.createConnection({ // Connection
    host: "", // Your host Adress
    user: "", // Your user Adress
    password: "", // Your Password
    database: "" // Your DB np. discord/test etc.
  });
  
  con.connect(function(err) { // Connection to DB
    if (err) throw err;
    console.log("Connected!\n");
  });


// Console show info

client.on("ready", () => { // If bot run showing bot info...
	
	console.log(" ");
	console.log("Welcome in BookSave created by suri");
	console.log(" ");
	console.log("Connected as " + client.user.tag);
	console.log(" ");
	
});

client.on('message', msg => {

    if ( msg.content.startsWith('.helpBot') ){ // Function write message to DB (table messages)
        let text = 'prefix=`"."` \n Template: `prefixCommand` \n\n Commands: \n\n `.helpBot` \n  `.writeMSG` [ message ] - Writting message to DB. \n `.getMSG` [ id ] - Getting message. \n `.getIdMSG` [ id ] - Getiing message, message GID ( Guild ID ) and MID ( Message ID )'
        msg.channel.send(text)
    }

    if ( msg.content.startsWith('.writeMSG') ){ // Function write message to DB (table messages)

        var sql = "INSERT INTO messages (id , nick, message, guild, date) VALUES (NULL,"+"'"+msg.author.username+"'"+","+"'"+msg.content.slice(9)+"'"+","+"'"+msg.guild.name+"'"+", NOW())";
        con.query(sql, function (err, result) {
          if (err) throw err;
          // If insert info ^ this is showing in chat.
          console.log("1 message write");
          msg.channel.send("`Written message.`");
        });

        con.query("SELECT * FROM messages", function (err, result, fields) { // Taking all from messages
            if (err) throw err;

            var howmuch = 0; // How much user message 
            
            for (var x=0; x != result.length; x++){
                if ( result[x]["nick"] == msg.author.username &&  result[x]["guild"] == msg.guild.name){

                    howmuch += 1;

                    if (x==result.length-1){

                        msg.channel.send("`You have "+howmuch+" saved message`")

                    }
                }
            }
        })
    
    }
    if ( msg.content.startsWith(".getMSG")){ // Function get message from DB (table messages)

        const args = msg.content.slice(7).trim().split(/ +/); // argument and slice 6 <-- (".getMG")

        con.query("SELECT * FROM messages", function (err, result, fields) { // Taking all from messages
            if (err) throw err;

            var howmuch = 0; // How much user message 
            
            for (var x=0; x != result.length; x++){
                if ( result[x]["nick"] == msg.author.username &&  result[x]["guild"] == msg.guild.name){
    
                    howmuch += 1;

                    if ( howmuch == args[0]){ // Showing user message (id)
                        msg.channel.send("`"+result[x]["nick"]+" // "+result[x]["message"]+"`");
                    }
                    else if ( howmuch < args[0]-1 ){ // If user dont saved messages
                        msg.channel.send("`DB dont have msg.`")
                        x=result.length-1;
                    }
                
                }
            }
    
        })
    

    }   

    if ( msg.content.startsWith(".getIdMSG")){ // Function get message from DB (table messages)

        const args = msg.content.slice(9).trim().split(/ +/); // argument and slice 6 <-- (".getMG")

        con.query("SELECT * FROM messages", function (err, result, fields) { // Taking all from messages
            if (err) throw err;

            var howmuch = 0; // How much user message 
            
            for (var x=0; x != result.length; x++){
                if ( result[x]["nick"] == msg.author.username &&  result[x]["guild"] == msg.guild.name){
    
                    howmuch += 1;

                    if ( howmuch == args[0]){ // Showing user message (id)
                        msg.channel.send("`(GID: "+howmuch+") "+result[x]["nick"]+" // "+result[x]["message"] + " (MID: "+result[x]['id']+")`");
                    }
                    else if ( howmuch < args[0]-1 ){ // If user dont saved messages
                        msg.channel.send("`DB dont have msg.`")
                        x=result.length-1;
                    }
                
                }
            }
    
        })
    

    } 
})
//auth

client.login(token); 