const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('voice_test')
        .setDescription('Check if in voice channel'),
    async execute(interaction) {
        const voice = interaction.member.voice;
        console.log(voice);
        const voiceChannel = interaction.member.voice.channel;

        if (voiceChannel) return interaction.channel.send(`You are in voice channel ${voiceChannel}.`);

        else return interaction.channel.send('You are not in a voice channel');
    },
};
