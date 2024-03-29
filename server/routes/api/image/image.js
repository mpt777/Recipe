import { Router } from 'express'
import { Image } from '#src/models/image/Image'
import multer from "multer";
import path from "path";
import {authenticateToken } from '../../../middleware/auth.js'
import {User } from '../../../models/auth/User.js'


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
// const upload = multer({ storage: multer.memoryStorage() });

  // Handle file upload request
router.post('/upload', authenticateToken, upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No files were uploaded.');
        }
        const image = await new Image({
            title: req.body.title || req.file.filename, 
            src:req.file.path, 
            name:req.file.filename, 
            createdBy:req.body.createdBy, 
            alt:req.body.alt || ""
        }).save();

        res.status(200).json(image);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.post('/:id', authenticateToken, upload.single("file"), async (req, res) => {
    const { id } = req.params
    try {
        let image = await Image.findByIdAndUpdate(id, req.body)
        if (req.file) {
            image.src = req.file.path
            image.name = req.file.filename
        }
        image.save()

        res.status(200).json(image);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/', authenticateToken, async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.username });

        if (user == null) {
            return res.status(200).json([]);
        }

        const images = await Image.where("createdBy").equals(user._id).exec()

        res.status(200).json(images);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.get('/file/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        const image = await Image.findById(id)
        if (!image) throw new Error('No Image found')
        // res.sendFile() // or any other way to get a readable stream
     
        const fileName = appRoot + "/" + image.src;
        res.sendFile(fileName, function (err) {
            if (err) {
                next(err);
            } else {
                // console.log('Sent:', fileName);
                next();
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
  })

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const image = await Image.findById(id)
        if (!image) throw new Error('No Recipe found')
        res.status(200).json(image)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})