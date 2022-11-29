const router = require('express').Router()
const auth = require('../middleware/auth');
const cloudinary = require("cloudinary");//cloudinary
const fs = require("fs");//thư viện của nodejs
const authAdmin = require('../middleware/authAdmin');

cloudinary.config(
    {   cloud_name:process.env.CLOUD_NAME,
        api_key:process.env.CLOUD_API_KEY,
        api_secret:process.env.CLOUD_API_SECRET,
    },
);

router.post("/upload",auth,authAdmin,(req,res) => {
    try {
        console.log(req.files)
        if(!req.files||Object.keys(req.files).length===0){
            return res.status(400).json({msg:"no files were upload"});
        }
        const file = req.files.file;
        if(file.size > 1024 * 1024) {
            remove(file.tempFilePath)
            return res.status(400).json({msg:"size too larger"});
        }
        if(file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
            remove(file.tempFilePath)
            return res.status(400).json({msg:"file format is incorrect"});
        }
        cloudinary.v2.uploader.upload(file.tempFilePath,{folder:"test"},async(err,result) => {
            remove(file.tempFilePath)
            if(err) throw err;
            res.json({public_id:result.public_id,url:result.secure_url})
        })
    }catch(error) {
        return res.status(500).json({msg:error.message});
    }
});
router.post("/destroy",auth,authAdmin,(req,res) => {
    try {
        const {public_id} = req.body;
        if(!public_id)
        return res.status(400).json({msg:"no img select"});
        cloudinary.v2.uploader.destroy(public_id,async(err,result) => {
            if(err) throw err;   
            res.json({msg:"delete image"})
        })
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
})

const remove = (path) => {
    fs.unlink(path,(err) => {
        if(err) throw err;
    })
}

module.exports = router;
