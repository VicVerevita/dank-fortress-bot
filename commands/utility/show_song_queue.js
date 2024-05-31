const { SlashCommandBuilder } = require("discord.js");
const { queue } = require('./queue');
const { ytdl } = require('ytdl-core');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Shows the song queue'),

    async execute(interaction) {
        let queueJson = queue.showQueue(interaction);
        queueJson = queueJson.map(entry => {
            return ytdl.getInfo(entry.stream.video_url);
        });
        console.log(queueJson);
        await interaction.reply('Showing Queue:');
    }
}
        
