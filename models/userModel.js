//!mdbgum
const mongoose = require('mongoose'); 
const userSchema = new mongoose.Schema({
    name:{
        type:String,//kiểu dữ liệu là string dang chữ
        required:true,//bắt buộc 
        trim:true,//xóa khoảng cách nếu thừa
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{// admin nếu là 1
        type:Number,//dạng số
        default:0,//mặc địng là người thường
    },
    cart:{
        type: Array,//dạng mảng
        default:[],//mặc dịnh trống
    }
} ,  
    {timestamps: true}//thời gian thêm ,sửa
);

module.exports = mongoose.model('User', userSchema);