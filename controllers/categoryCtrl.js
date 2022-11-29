const Category = require("../models/categoryModel");
const Products = require("../models/productModel");
const categoryCtrl = {
    // xem all category
    getCategories :async(req,res) => {
        // role la 1 -> admin
        try {
            const categorys= await Category.find();
            res.json(categorys)
        } catch (error) {
            return res.status(500).json({msg:error.message});
        }
    },
    // create(tạo ra) a category
    //only admin can create category, delete, update, 
    createCategory :async(req,res) => {
        try {
            //thử xem role bằng 0 thì có lỗi k
            // khi role bằng 1 thì hiẻm thị ra chữ
            // res.json("admin")
            //do role bằng 0 nên lỗi
            //đổi role bằng 1
            //đổi trong robo 3T với uses vào edit
            const {name} = req.body;
            const category = await Category.findOne({name});
            if(category) 
                return res.status(400).json({msg:"The name already exists"});
            const newCategory = new Category({name});
            //res.json({newCategory});
            await newCategory.save();  
            res.json("create a category")
        } catch (error) {
            return res.status(500).json({msg:error.message});
        }
    },
    deleteCategory :async(req,res) => {
        try {
           const product = await Products.findOne({categories: req.params.id});
           if(product) return res.status(400).json({msg:"Delete all Product"});
           await Category.findByIdAndDelete(req.params.id)
           res.json("delete a category")
        } catch (error) {
            return res.status(500).json({msg:error.message});
        }
    },
    updateCategory :async(req,res) => {
        try {
            const {name} = req.body;
            await Category.findOneAndUpdate({_id: req.params.id}, {name})
            res.json("update a category")
        } catch (error) {
            return res.status(500).json({msg:error.message});
        }
    },
}
module.exports = categoryCtrl