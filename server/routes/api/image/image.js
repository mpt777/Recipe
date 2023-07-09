import { Router } from 'express'
import { Image } from '../../../models/image/Image.js'
import multer from "multer";

export const router = Router()


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Set the upload directory
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      // Set the file name as the current timestamp with the original extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
    limits: {
        fileSize: 1000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) { 
            // upload only png and jpg format
            return cb(new Error('Please upload a Image'))
        }
        cb(undefined, true)
    }
});
  
const upload = multer({ storage: storage });
  
  // Handle file upload request
router.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No files were uploaded.');
    }

    const image = new Image({title: req.body.title, src:req.file.filename});
    image.save();

    res.send('File uploaded successfully!');
});

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const recipe = await Image.findById(id)
        if (!recipe) throw new Error('No Recipe found')
        res.status(200).json(recipe)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})