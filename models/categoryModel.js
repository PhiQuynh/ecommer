const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var categirySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    
} ,  
    {timestamps: true}
);

//Export the model
module.exports = mongoose.model('Category', categirySchema);