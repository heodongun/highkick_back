const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;
require('./config/db');

const api = require('./routes/api');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', api);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT} 에서 서버 실행중`);
});