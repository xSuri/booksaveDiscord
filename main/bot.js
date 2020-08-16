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

    if ( msg.content.startsWith('.writeMSG') ){ // Function write message to DB (table messages)

        var sql = "INSERT INTO messages (id , nick, message, guild, date) VALUES (NULL,"+"'"+msg.author.username+"'"+","+"'"+msg.content.slice(9)+"'"+","+"'"+msg.guild.name+"'"+", NOW())";
        con.query(sql, function (err, result) {
          if (err) throw err;
          // If insert info ^ this is showing in chat.
          console.log("1 message write");
          msg.channel.send("Written message.");
        });
    
    }
    if ( msg.content.startsWith(".getMG")){ // Function get message from DB (table messages)

        const args = msg.content.slice(6).trim().split(/ +/); // argument and slice 6 <-- (".getMG")

        con.query("SELECT * FROM messages", function (err, result, fields) { // Taking all from messages
            if (err) throw err;

            var howmuch = 0; // How much user message 
            
            for (var x=0; x != result.length; x++){
                if ( result[x]["nick"] == msg.author.username &&  result[x]["guild"] == msg.guild.name){
    
                    howmuch += 1;
                    console.log("Messages: "+howmuch)
                    // if ( x==result.length-1 ){ // Value user saved message
                    //     msg.channel.send("You have "+howmuch+" saved message.")
                    // }
                    if ( howmuch == args[0]){ // Showing user message (id)
                        msg.channel.send(result[x]["nick"]+" // "+result[x]["message"]);
                    }
                    else if ( howmuch < args[0]-1 ){ // If user dont saved messages
                        msg.channel.send("DB dont have msg.")
                        x=result.length-1;
                    }
                
                }
                else if ( x==result.length-1 && result[x]["nick"] != msg.author.username ){ // Secure to saved message to one guild
    
                    msg.channel.send("This message is no saved in this guild or don't exit.(?)");
    
                }
            }
    
        })
    

    }   
})
//auth

client.login(token); 