const mongoose =require("mongoose")

const dotenv = require("dotenv");

dotenv.config();

const apiUrl = process.env.REACT_APP_MONGO_URL

mongoose.connect(apiUrl)
    .then(()=>console.log("connected to db"))

const ProductModel = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    category: String,
    Added_by: String,
})

const Product = mongoose.model("Product",ProductModel);

module.exports = Product;
