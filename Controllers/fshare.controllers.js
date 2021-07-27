const axios = require('axios');
const shorturl = require('../Utils/shorturl');

const getlink = async (req, res) => {
	let response = await axios.post('https://api.fshare.vn/api/user/login', {
		user_email: process.env.FSHARE_USERNAME,
		password: process.env.FSHARE_PASSWORD,
		app_key: 'L2S7R6ZMagggC5wWkQhX2+aDi467PPuftWUMRFSn',
	});

	const { token, session_id } = response.data;

	try {
		response = await axios.post(
			'https://api.fshare.vn/api/session/download',
			{
				token: token,
				url: `https://www.fshare.vn/file/${req.params.id}`,
			},
			{
				headers: {
					Cookie: `session_id=${session_id}`,
				},
			}
		);
	} catch (err) {
		return res.status(404).json(err.response.data);
	}

	const short = await shorturl(
		response.data.location.replace('http://', 'https://')
	);

	res.json({
		location: short.shortenedUrl,
		filename: response.data.location.split('/')[5],
	});
};

module.exports = { getlink };
