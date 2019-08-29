const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const visionRouter = require('./routes/api/vision');

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', express.static(path.join(__dirname, '..', 'public')));

app.use('/api/vision', visionRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app
