const {Panel} = require("@akarui/aoi.panel")
const aoijs = require("aoi.js")
const {Bot} = require("aoi.js");
const bot = new Bot({
    token: process.env.token,
    prefix: ["$getServerVar[prefix]"],
    intents: ["GUILDS", "GUILD_MESSAGES"],
    mobile: true, //True or false
})
//Bot Vars go in variables.js
bot.variables(require('./variables.js'));
//Dev Panel Things
const panel = new Panel({
    username: process.env.username,//username for logging in
    password: process.env.password,//password for logging in
    secret: "aoijs",//session secret
    port: 3000,//port on which website is hosted, Not required! Default 3000
    bot: bot,//your aoi.js client
    mainFile: "index.js",//Main file where code is running.Not required, default taken from package.json
    commands: "commands"// folder name in which all the edit needing files are there.
})
//Events
panel.loadPanel()//Load The Panel
panel.onError()//Tells Errors When the panel has a error
bot.onMessage()//
//Bot Ready Events
bot.readyCommand({
  channel: "",
  code: `
    $log[
  ─━━━━━━━Ready Command Code━━━━━━━━━━━─
  Client: $userTag[$clientID]
  Ping: $ping ms
  Bot Creator: $username[$botOwnerID]#$discriminator[$botOwnerID]
  Commands loaded: $commandsCount
  ─━━━Created by BrianMitc#7316━━━─]`
})
bot.readyCommand({
    channel: "",
    code: `$log[Filter reseted.]
$editIn[30ms;Reseted.;Reseted. **$serverCount Servers**]
Reseting Filter..
$setVar[last;$dateStamp]
$sendMessage[\`Ready on client $userTag[$clientID] Ping: $ping ms Bot Creator: $username[$botOwnerID]#$discriminator[$botOwnerID] Commands loaded: $commandsCount\` (\`$packageVersion\`);no]`
})
//Bot Status
bot.status({
    text: "$serverCount servers!",
    type: "WATCHING",
    time: 12
})
bot.status({
  text: "With Code!",
  type: "PLAYING", //can be PLAYING, WATCHING, LISTENING, STREAMING, COMPETING
  status: "idle", //can be online, idle, dnd, offline
  time: 12
})
bot.status({
text: "Need Support? Join Support Discord!", 
type: "STREAMING", 
url: "https://discord.gg/6qVEjMjYQa",
  time: 12
})
//Bot Commands
//Aways Execute Command
bot.command({
    name: "$alwaysExecute",
    code: `
    $setChannelVar[msg;$getChannelVar[msg]
    $username: $message]
    $onlyIF[$isTicket!=false;]
        `
})
//Slash Bot Commands

//None Yet.