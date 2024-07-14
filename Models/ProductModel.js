const mongoose =require("mongoose")

mongoose.connect("mongodb+srv://saranshbhaduka111:AlwaysHappy%40121@firstproject.rfiuj9v.mongodb.net/Pesto")
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
