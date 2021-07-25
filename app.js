const axios = require('axios');
const cors = require('cors');
const app = require('express')();

require('dotenv').config();

app.use(cors());

app.get('/', async (req, res) => {
	let response = await axios.post('https://api.fshare.vn/api/user/login', {
		user_email: process.env.FSHARE_USERNAME,
		password: process.env.FSHARE_PASSWORD,
		app_key: 'L2S7R6ZMagggC5wWkQhX2+aDi467PPuftWUMRFSn',
	});

	const { token, session_id } = response.data;

	response = await axios.post(
		'https://api.fshare.vn/api/session/download',
		{
			token: token,
			url: `https://www.fshare.vn/file/${req.query.id}`,
		},
		{
			headers: {
				Cookie: `session_id=${session_id}`,
			},
		}
	);

	res.json(response.data);
});

app.listen(process.env.PORT, () => console.log('Running...'));
