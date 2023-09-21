const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./router.js');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
require('dotenv').config()

const PORT = 5000;


const app = express();
app.use(express.json());
app.use('/api', router);
app.use(fileUpload({}))
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())


async function startApp() {
    try {
        await mongoose.connect(process.env.DB_URL)
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))
    } catch (e) {
        console.log(e)
    }
}
startApp();
module.exports = app


