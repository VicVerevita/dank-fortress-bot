const { SlashCommandBuilder } = require("discord.js");
const { queue } = require('./queue');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pauses the music player'),

    async execute(interaction) {
        queue.pause(interaction);
    }
}
        
