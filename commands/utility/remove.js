const { SlashCommandBuilder, StringSelectMenuBuilder } = require("discord.js");
const { queue } = require('./queue');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('Remove a song from the queue'),

    async execute(interaction) {
        const select = new StringSelectMenuBuilder()
            .setCustomId('remover')
            .setPlaceholder('Select what song you want removed!')

        for (let i = 0; i < queue.elements; i++)
            
        queue.showQueue(interaction);
    }
}
        
