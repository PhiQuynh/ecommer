//  !mdbgum
const mongoose = require('mongoose'); 
const productSchema = new mongoose.Schema({
    product_id:{
        type:String,
        required:true,
        unique:true,//nhập tiếng việt
        trim:true,
    },
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
        trim:true,
    },
    contact:{
        type:String,
        required:true,
    },  
    images:{
        type:Object,//dạng {}
        required:true,
    }, 
    categories:{
        type:String,
        required:true,
    }, 
    checked:{
        type:Boolean,//dạng đúng sai
        default:false,
    },
    sold:{
        type:Number,
        default:0,
    },
} , {
    timestamps:true,
}
);
module.exports = mongoose.model('Product', productSchema);