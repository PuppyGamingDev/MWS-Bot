const mongoConnect = require('../utilities/mongoConnect.js');

// Users data storage
const Users = new Map();
const userSchema = require('../schemas/userSchema.js');

const getUser = (id) => {
	return Users.get(id);
};

const setUser = async (id, data) => {
	Users.set(id, data);
	await mongoConnect();
	await userSchema.findOneAndUpdate({ _id: id }, { wallets: data }, { upsert: true });
};


// Guilds data storage
const Guilds = new Map();

const getGuild = (id) => {
	return Guilds.get(id);
};

const setGuild = async (id, data) => {
	Guilds.set(id, data);
};

// Common data storage

const refreshData = async () => {
	await mongoConnect();
	const users = await userSchema.find();
	if (users[0] === undefined) return;
	users.forEach(user => {
		Users.set(user._id, user.wallets);
	});
};

module.exports = { getUser, setUser, getGuild, setGuild, refreshData };