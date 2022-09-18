const express = require("express");
const app = express();
require("./db/mongoose");
const userRouter = require("./routers/user");
const authRouter = require("./routers/auth");
const productRouter = require("./routers/product");
const cartRouter = require("./routers/cart");
const orderRouter = require("./routers/order");

app.use(express.json());
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/carts", cartRouter);
app.use("/orders", orderRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("server is running");
});
