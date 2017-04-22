const generateBase36 = () => {
	var random = Math.floor(Math.random() * 10000000) + 10000000;
	return random.toString(36);
};

module.exports = { generateBase36 };