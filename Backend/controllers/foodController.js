import foodModel from "../models/foodModel.js";
import fs from 'fs'


// add food item

const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        imageFilename: image_filename
    })
    try {
        await food.save();
        res.json({ success: true, message: "Food Added" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}


// add food list

const listFood = async (req,res)=>{
    try{
        const foods = await foodModel.find({});
        res.json({success: true,data: foods})
    }
    catch(error){
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

//remove food item

const removeFood = async (req,res)=>{
    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.json({ success: false, message: "Food item not found" });
        }
        // Remove image from GridFS
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: 'uploads' // Make sure this matches your GridFS bucket name
        });

        // Find the file by filename and delete it
        const files = await bucket.find({ filename: food.imageFilename }).toArray();
        if (files.length > 0) {
            const file = files[0];
            bucket.delete(file._id);
        }

        // fs.unlink(`uploads/${food.image}`,()=>{})
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {addFood ,listFood,removeFood}
