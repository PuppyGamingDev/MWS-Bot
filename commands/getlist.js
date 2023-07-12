const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { getUser } = require('../utilities/Storage.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('getlist')
		.setDescription('Get a list of linked wallets based on a role and chain')
		.addStringOption(option => option
			.setName('chain')
			.setDescription('What chain?')
			.setChoices([
				{ name: 'Ethereum', value: 'Ethereum' },
				{ name: 'Polygon', value: 'Polygon' },
				{ name: 'Solana', value: 'Solana' },
				{ name: 'Sui', value: 'Sui' },
				{ name: 'XRPL', value: 'XRPL' },

			])
			.setRequired(true))
		.addRoleOption(option => option
			.setName('role')
			.description('What role?')
			.setRequired(true))
		.setDefaultMemberPermissions(0),
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });
		const chain = interaction.options.getString('chain');
		const role = interaction.options.getRole('role');
		const guild = interaction.guild;
		const users = await guild.members.cache.filter(member => member.roles.cache.has(role.id));
		var wallets = [];
		users.forEach(user => {
			const userWallets = getUser(user.id);
			if (userWallets && userWallets !== undefined && userWallets[chain]) {
				wallets.push(userWallets[chain]);
			}
		});
		if (wallets.length === 0) {
			return await interaction.editReply('No wallets found');
		};
		const attachment = new AttachmentBuilder('wallets.txt', Buffer.from(JSON.stringify(wallets, null, 2)));
		return await interaction.editReply({ content: `Here are the collected wallets.`, files: [attachment] });
	},
};