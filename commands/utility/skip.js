const { SlashCommandBuilder } = require("discord.js");
const { queue } = require('./queue');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Plays the next song'),

    async execute(interaction) {
        queue.skip(interaction);
    }
}
        
