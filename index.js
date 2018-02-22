const Discord = require("discord.js");
const cbot = new Discord.Client();

cbot.on('ready', () => {
  console.log(`Logged in as ${cbot.user.tag}!`);
  cbot.user.setPresence({ game: { name: `prefix is ;`, type: 0 }});
});

const prefix = ";"

cbot.on('guildCreate', guild => {
  guild.leave()
}); 

cbot.on('message', msg => {
  if (msg.author.bot) return;

  if (msg.content.startsWith(prefix + 'ping')) {
    msg.channel.send("Pinging...").then(sent => {
      sent.edit(`Pong! (${sent.createdTimestamp - msg.createdTimestamp}ms)`)
    })
  }

  if (msg.content.startsWith(prefix + 'subscribe')) {
    let args = msg.content.split(" ").slice(1).join(" ")
    var announceRole = msg.guild.roles.find("name", "cat announcements")
    if (!args) {
      msg.channel.send("You're dumb. Provide args, please.")
    } else if (args === "announcements") {
      msg.channel.send("You've successfully subscribed to `announcements`!")
      msg.member.addRole(announceRole)
    }
  }

  if (msg.content.startsWith(prefix + 'unsubscribe')) {
    let args = msg.content.split(" ").slice(1).join(" ")
    var announceRole = msg.guild.roles.find("name", "cat announcements")
    if (!args) {
      msg.channel.send("You're dumb. Provide args, please.")
    } else if (args === "announcements") {
      msg.channel.send("You've successfully unsubscribed from `announcements`!")
      msg.member.removeRole(announceRole)
    }
  }
});

cbot.login(process.env.BOT_TOKEN);
