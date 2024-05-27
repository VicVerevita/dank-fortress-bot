const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('check_permissions')
		.setDescription('Checks if user has the permissions to use the bot.'),
	async execute(interaction) {
        if(!interaction.member.roles.cache.has('684522227118506024')) {
            interaction.channel.send('You don\'t have permissions to use this bot!');
        }
        else {
            interaction.channel.send('You have permissions to use this bot!');
        }
	},
};
