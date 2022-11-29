const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Payments = require("../models/paytmentModels");

const userCtrl ={
    register: async(req , res) => {
        try {
            // res.json(req.body)
            const {name,email,password} = req.body;//lấy giá trị từ req.body 
            const user = await Users.findOne({email});//tìm theo email
            if(user)
                return res.status(400).json({msg:"The email already exists"});
            if(password.length < 6) 
                return res.status(400).json({msg:"password is at the 6 char"});
            const passwordHash = await bcrypt.hash(password,10);
            const newUser = await Users({name,email,password:passwordHash});
            
            await newUser.save();
            const accessToken = createAccessToken({id:newUser._id})
            // res.json({accessToken});
            const refreshtoken = createRefreshToken({id:newUser._id})
            res.cookie("refreshtoken", refreshtoken,
                {
                    httpOnly: true,
                    path:"/user/refresh_token",
                });
            res.json({refreshtoken});
        } catch (error) {
            return res.status(500).json({msg:error.message});
        }
    },
    refreshToken : (req , res) => {
        try {
            const rf_token = req.cookies.refreshtoken;//lấy giá trị từ cookies
            // chưa đăng nhập hoặc đăng kí
            if(!rf_token) 
                return res.status(400).json({msg:"Please login or register"});
                jwt.verify(rf_token ,process.env.REFRESH,(err,user) => {
                    if(err) 
                        return res.status(400).json({msg:"Please login or register"});
                    const accessToken = createAccessToken({id:user.id})
                    res.json({accessToken});  
                });
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    login: async(req , res) => {
        try {
            const {email,password} = req.body; //lấy giá trị người dùng nhập
            const user = await Users.findOne({email});//tìm giá trị Users có email ở db
            if(!user) return res.status(400).json({msg:"User does not exist"});//nếu ko có thì tb lỗi
            const isWatch = await bcrypt.compare(password, user.password);
            //bcrypt thư viện,compare:hàm ktra 2 biến có kí tự giống ko
            if(!isWatch) return res.status(400).json({msg:"incorrerct password"});
            const accessToken = createAccessToken({id:user._id});
            // res.json({accessToken});
            const refreshtoken = createRefreshToken({id:user._id});
            res.cookie("refreshtoken", refreshtoken,
                {
                    httpOnly: true,
                    path:"/user/refresh_token",
                });
            res.json({refreshtoken});
        } catch (error) {
            return res.status(500).json({msg:error.message});
        }
    },
    logout: async(req , res) => {
        try {
            //xóa cookie 
            //path:"/user/refresh_token" :đg dẫn để xóa
            //refreshtoken:tên biến
            res.clearCookie("refreshtoken", {path:"/user/refresh_token"});
            return res.status(400).json({msg:"Logout"});
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    getUser: async(req , res) => {
        try {
            //findById :tìm kiếm theo id
            // res.json(req.user.id)
            const user = await Users.findById(req.user.id).select("-password");    
            if(!user) return res.status(400).json({msg:"User does not exist"});
            res.json({user});
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },  
    addCart:async(req , res) => {
        try {
            const user = await Users.findById(req.user.id);
            if(!user) return res.status(400).json({msg:"User does not exist"});
            //findOneAndUpdate :edit,update
            //truyền id ,giá trị thay đổi
            await Users.findOneAndUpdate(
                { _id: req.user.id}, 
                {cart:req.body.cart});
                return res.json({msg:"Add to cart"})
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    history: async (req,res) => {
        try {
            //find() :in ra tất cả
            //find({user_id:req.user.id}):tìm kiếm có đki
            const history=await Payments.find({user_id:req.user.id})
            res.json(history)
        } catch (error) {
            return res.status(500).json({msg:error.message});
        }
    }
};
const createAccessToken = (user) =>{
    return jwt.sign(user, process.env.ACCESS,{expiresIn:"1d"})
    //s:giay
    //m:thang
    //h:gio
    //d:day
    //y:nam
};
const createRefreshToken = (user) =>{
    return jwt.sign(user, process.env.REFRESH,{expiresIn:"7d"})
};
module.exports = userCtrl