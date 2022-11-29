//app.mvc
require("dotenv").config();// kết nối với file .env
const express = require("express");//thêm framwork express
const cors = require("cors");//thêm thư viện cors
const file = require("express-fileupload");
const cookies = require("cookie-parser")
const app = express();//khai báo 
app.use(express.json()) ;  // để có thể  dùng req.body
app.use(cors());
app.use(cookies());
app.use(file({
  useTempFiles:true // để cho có đg 
}));

const port = process.env.PORT || 5000;

//get :xem 1 hoặc nhiều hoặc tất cả sản phẩm
//post:thêm sản phẩm
//delete :xóa 1 sản phẩm
//patch:thêm vào giỏ hàng
//put:sửa 1 sản phẩm
app.get("/", (req, res) => {
  //input:req.body
  //res.json
  //res.staus
  res.send("hello from simple server :)");
});
//app.connect
const colors = require("colors");
const mongoose = require("mongoose");
mongoose
  .connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log("> Connected...".bgCyan))
  .catch((err) =>
    console.log(
      `> Error while connecting to mongoDB : ${err.message}`.underline.red
    )
  );

app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);

const userRouter = require("./routers/userRouter");
app.use("/user",userRouter);
const categoryRouter = require("./routers/categoryRouter");
app.use("/api",categoryRouter);
const uploadRouter = require("./routers/uploadRouter");
app.use("/api",uploadRouter);
const productRouter = require("./routers/productRouter");
app.use("/api",productRouter);
const paymentRouter = require("./routers/paymentRouter");
app.use("/api",paymentRouter);