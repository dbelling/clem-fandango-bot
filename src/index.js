#!/usr/bin/env node

const Discord = require("discord.js");
const minimist = require("minimist");
const figlet = require("figlet");
const chalk = require("chalk");
const notifications = require("./notifications");
const client = new Discord.Client();

/**
 * Initialize timer for a day - call notifyUserInChannel()
 */
client.on("ready", () => {
    console.info(
        chalk.blue(
            figlet.textSync("Clem Bot", { font: "Wet Letter" })
        )
    );
    let notificationInterval = Math.floor(Math.random() * 86400000);
    let channel = client.channels.find(ch => ch.name === "general");
    setTimeout(function(){
        notifications.notifyUserInChannel(client, channel);
    }, notificationInterval);
});

/**
 * Main
 */
(function(){
    // grep flags from tokenized arguments
    let flags = minimist(process.argv.slice(2));
    if(!flags.t) {
        console.warn("Token (-t) required to authenticate clembot.");
        console.warn("usage: clembot [-t=<token>]");
        console.warn("-t     token for authentication");
    } else {
        try {
            client.login(flags.t);
        } catch(err) {
            // TODO: Additional exception handling (i.e. Discord outages, etc)
            console.warn("Invalid Discord token provided.");
        }
    }
})();
