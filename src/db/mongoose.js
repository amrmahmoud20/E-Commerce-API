const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODBURL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((e) => console.log(e));
