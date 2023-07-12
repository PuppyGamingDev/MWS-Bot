const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	_id: {
		type: mongoose.SchemaTypes.String,
		required: true,
	},
	wallets: {
		type: mongoose.SchemaTypes.Mixed,
	},

});
const name = 'user';
module.exports = mongoose.models[name] || mongoose.model(name, userSchema);