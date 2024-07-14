const mongoose =require("mongoose");

mongoose.connect("mongodb+srv://saranshbhaduka111:AlwaysHappy%40121@firstproject.rfiuj9v.mongodb.net/Pesto")
    .then(()=>console.log("connected to db"))
const UserModel = new mongoose.Schema({
    Username: String,
    Password: String,
    Email: String,
    Phone: String
});

const User = mongoose.model("User", UserModel);

module.exports = User;