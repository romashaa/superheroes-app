import express from 'express';
import mongoose from 'mongoose';
import Superhero from "./Superhero.js";
import router from "./router.js";
import fileUpload from 'express-fileupload';

const PORT = 5000;
const DB_URL = "mongodb+srv://romashaa:supeRhero2359@cluster0.coxuf5e.mongodb.net/?retryWrites=true&w=majority";

const app = express();
app.use(express.json());
app.use('/api', router);
app.use(fileUpload({}))

async function startApp() {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))
    } catch (e) {
        console.log(e)
    }
}
startApp();


