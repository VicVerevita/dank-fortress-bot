const { SlashCommandBuilder } = require("discord.js");
const { queue } = require('./queue');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stops the music player'),

    async execute(interaction) {
        queue.stop(interaction);
    }
}
        
