const cors = require('cors');
const app = require('express')();

require('dotenv').config();

app.use(cors());

const fshareRouter = require('./Routes/fshare.routes');

app.use('/fshare', fshareRouter);

app.listen(process.env.PORT, () => console.log('Running...'));
