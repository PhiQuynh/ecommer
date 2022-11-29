const Products = require("../models/productModel");
class API {
  //tạo class có 2 biến mặc định query,queryString
    constructor(query,queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    //lọc
    filtering(){
      const queryObj = {...this.queryString};
      // trước khi xóa
      //console.log({before:queryObj});//console.log(req.query)
      // sau khi xóa
      const excluded = ["page","sort","limit"];
      excluded.forEach((e) => delete(queryObj[e]))
      //console.log({after:queryObj});
      //chuyển về dạng String
      let queryStr=JSON.stringify(queryObj)
      //console.log({queryObj,queryStr});
      queryStr=queryStr.replace(
        /\b(gte|gt|lt|lte|regex)\b/g,
        match=>"$"+match);
      this.query.find(JSON.parse(queryStr));
      //lọc theo giá, kí tự
      //gt: lọc lớn hơn 20
      //lt lọc các sản phẩm có giá trị nhỏ hơn : nhỏ hơn 20
      //gtx là lọc các sản phẩm lớn hơn hoặc bằng
      //ltx lọc các sản phẩm nhở hơn hoặc bằng
      //regex lọc bằng các kí tự
      return this;
    }
    // xắp xếp
    sorting(){
      //nếu là chữ
      if(this.queryString.sort){
        // chuyển các ksi tự thành
        const sortBy = this.queryString.sort.split(",").join("");
        this.query= this.query.sort(sortBy)
      }else{
        //locj theo tất cả ngày khởi tạo
        this.query= this.query.sort("createAt");
      }
      return this;
    }
    //phân trang
    paginating(){
      const page = this.queryString.page +1 || 1;
      //1 trabg có bao nhiêu sản phẩm VD 1 trang có 1 sản phẩm
      //2 sanr phaamr
      const limit = this.queryString.limit + 1 || 8;
      const skip = (page-1) + limit;
      this.query = this.query.skip(skip).limit(limit);
      return this;
    }
}
const productCtrl = {
  getProducts: async (req, res) => {
    try { 
    
      const features = new API(Products.find(),req.query).filtering().sorting().paginating();
        const products = await features.query;
        res.json({status:"seccess",result:products.length,products:products});
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  createProduct: async (req, res) => {
    try {
        const {
            product_id,
            title,
            description,
            price,
            contact,
            images,
            categories,
          } = req.body;
          if(!images){
            return res.status(400).json({ msg: "No images selected" });
          } 
          const product = await Products.findOne({ product_id});
          if(product){
              return res.status(400).json({ msg:"This product already exists"})
          }
          const newProduct = new Products({
            product_id,
            title:title.toLowerCase(),
            description,
            price,
            contact,
            images,
            categories,
          });
           //res.json({newProduct});
          await newProduct.save();
          res.json("Create a product")
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
        //findByIdAndDelete(req.params.id)
        //xóa theo id
        await Products.findByIdAndDelete(req.params.id)
        res.json("Delete a product")
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
        const {
            product_id,
            title,
            description,
            price,
            contact,
            images,
            categories,
          } = req.body;
        if(!images){
            return res.status(400).json({ msg: "No images selected" });
          } 
          // findOneAndUpdate cập nhật theo id ,và lấy giá trị mới
        await Products.findOneAndUpdate(
            {_id : req.params.id},
            {
                 title,
                description,
                price,
                contact,
                images,
                categories,
              });
        res.json("Update a product")
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = productCtrl;
