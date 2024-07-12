// multer-config.js

import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';


const storage = new GridFsStorage({
    url: "mongodb+srv://aj_abhijeetsingh:pulsar150@cluster0.1d8wqln.mongodb.net/food-del",
    // options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        return {
            filename: `${Date.now()}_${file.originalname}`
        };
    }
});

const upload = multer({ storage });

export default upload;
