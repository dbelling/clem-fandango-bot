module.exports = {
    /**
     * notifyUserInChannel()
     * Scrape the list of users in the channel,
     * and send a notification some random period of time 
     * in the next day.
     */
    notifyUserInChannel: function(client, channel) {
        let otherUsers = client.users.array().filter(usr => usr.username !== client.user.username);
        let victimIndex = Math.floor(Math.random() * otherUsers.length);
        let currentVictim = otherUsers[victimIndex];
        console.info(`[${new Date()}] Notifying ${currentVictim.username} in ${channel.name}`);
        channel.send(`Hello ${currentVictim}. This is Clem Fandango. Can you hear me?`);
        let nextInterval = Math.floor(Math.random() * 86400000);
        setTimeout(function(){
            module.exports.notifyUserInChannel(client, channel);
        }, nextInterval);
    }
};