const { SlashCommandBuilder } = require('discord.js');
const { getUser, setUser } = require('../utilities/Storage.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('wallets')
		.setDescription('Check or Set your wallets')
		.addSubcommand(subcommand =>
			subcommand.setName('check')
				.setDescription('Check your wallets'))
		.addSubcommand(subcommand =>
			subcommand.setName('set')
				.setDescription('Set your wallets')
				.addStringOption(option => option.setName('chain')
					.setDescription('What chain?')
					.setChoices([
						{ name: 'Ethereum', value: 'Ethereum' },
						{ name: 'Polygon', value: 'Polygon' },
						{ name: 'Solana', value: 'Solana' },
						{ name: 'Sui', value: 'Sui' },
						{ name: 'XRPL', value: 'XRPL' },

					])
					.setRequired(true))
				.addStringOption(option =>
					option.setName('address')
						.setDescription('Your wallet address')
						.setRequired(true))),
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });
		switch (interaction.getSubcommand()) {
			case 'check': {
				const user = getUser(interaction.user.id);
				if (!user || user === undefined) {
					return await interaction.editReply('You have no wallets set');
				}
				var wallets = '';
				for (const [key, value] of Object.entries(user)) {
					wallets += `**${key}**: ${value}\n`;
				};
				return await interaction.editReply(wallets);
			}
			case 'set': {
				const chain = interaction.options.getString('chain');
				const address = interaction.options.getString('address');

				const user = getUser(interaction.user.id);
				var wallets = {};
				if (user && user !== undefined) {
					wallets = user;
				}
				wallets[chain] = address;
				await setUser(interaction.user.id, wallets);
				return await interaction.editReply(`Your **${chain}** wallet has been set to *${address}*`);
			}
		}

	},
};