import express from "express"
import cors from "cors"
import { connect } from "mongoose"
import connectDB from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import upload from "./config/multer-config.js"
import 'dotenv/config';





// app config
const app = express()
const port = 4000


//middleware
app.use(express.json())

app.use(cors(
    {
        origin: ["https://abhijeet-ka-dhaba.vercel.app","https://food-delivery-rho-nine.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
))



//db connection

connectDB();

// api endpoints 

app.post('/api/upload', upload.single('image'), (req, res) => {
    res.json({ file: req.file });
});

// Route for serving images dynamically
app.get('/images/:filename', (req, res) => {
    const { filename } = req.params;
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: 'uploads' // GridFS bucket name
    });

    bucket.openDownloadStreamByName(filename).pipe(res);
});



app.use("/api/food", foodRouter)
// app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter);



app.get("/", (req, res) => {
    res.send("API is Working")
})

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})

//mongodb+srv://aj_abhijeetsingh:pulsar150@cluster0.1d8wqln.mongodb.net/?
