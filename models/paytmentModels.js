const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const paymentModel = new mongoose.Schema({
    user_id:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    paymentID:{
        type:String,
        required:true,
    },
    address:{
        type:Object,
        required:true,
    },
    cart:{
        type:Array,
        default:[]
    },
    status:{
        type:Boolean,
        default:false,
    },
    
}, {
    timestamps:true,
}
);

//Export the model
module.exports = mongoose.model('Payment',paymentModel);