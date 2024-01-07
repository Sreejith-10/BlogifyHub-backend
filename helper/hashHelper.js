const bcrypt = require("bcrypt");

const hashPassword = async (pass) => {
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(12, (err, salt) => {
			if (err) reject(err);
			else
				bcrypt.hash(pass, salt, (err, hash) => {
					if (err) reject(err);
					else resolve(hash);
				});
		});
	});
};

const comparePassword = async (pass, hasPass) => {
	return bcrypt.compare(pass, hasPass);
};

module.exports = {
	hashPassword,
	comparePassword,
};
