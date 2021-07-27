const axios = require('axios');

module.exports = async (url) => {
	const res = await axios.get(
		`https://fc.lc/api?api=${process.env.FCLC_TOKEN}&url=${url}`
	);
	return res.data;
};
