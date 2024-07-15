const mongoose =require("mongoose");

const apiUrl = process.env.REACT_APP_MONGO_URL;

mongoose.connect(apiUrl)
    .then(()=>console.log("connected to db"))
const UserModel = new mongoose.Schema({
    Username: String,
    Password: String,
    Email: String,
    Phone: String
});

const User = mongoose.model("User", UserModel);

module.exports = User;