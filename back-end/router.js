const express = require('express');
const SuperheroController = require('./SuperheroController.js');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg' );
    },
});
const upload = multer({
    storage: storage,
    filename: (req, file, cb) => {
        const uniqueSuffix = uuidv4();
        cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg');
    },
});


router.post('/superheroes', upload.array('images'), SuperheroController.create)
router.get('/superheroes', SuperheroController.getAll)
router.get('/superheroes/:id', SuperheroController.getOne)
router.put('/superheroes/:id', upload.array('images'), SuperheroController.edit);
router.delete('/superheroes/:id', SuperheroController.delete)
router.delete('/superheroes/:id/images',SuperheroController.deleteImages)

module.exports = router;