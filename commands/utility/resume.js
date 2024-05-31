const { SlashCommandBuilder } = require("discord.js");
const { queue } = require('./queue');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Resumes the music player'),

    async execute(interaction) {
        queue.resume(interaction);
    }
}
        
