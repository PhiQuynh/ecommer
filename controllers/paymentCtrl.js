const Payments = require("../models/paytmentModels");
const Users = require("../models/userModel");
const Products = require("../models/productModel");
const paymentCtrl = {
  getPaymets: async  (req, res) => {
    try {
      const payments = await Payments.find();
      res.json({ payments });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  createPayment: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("name email");
      if (!user) return res.status(400).json({ msg: "user does not exits" });
      const { _id, name, email } = user;
      const {paymentID,address,cart} = req.body;
      const newPayment = new Payments({
        user_id: _id,
        name,
        email,
        paymentID,
        address,
        cart,
      });
      // phải xóa các sản phẩm đã thanh toán ở trong giỏ hàng
      cart.filter((item) =>{
          return sold(item._id,item.quantity,item.sold);
      })
      await newPayment.save();
      res.json({msg:"Payment success"})
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
const sold = async(id,quantity, oldSold) =>{
    await Products.findOneAndUpdate({_id:id},{sold: quantity + oldSold});
}

module.exports = paymentCtrl;
