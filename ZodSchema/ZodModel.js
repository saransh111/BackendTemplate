const z = require("zod");

const UserSchema = z.object({
    Email : z.string().email(),
    Password : z.string(),
    Username : z.string()
  });

const ProductSchema = z.object({
    name : z.string(),
    price : z.number()
});
  
module.exports = {
    UserSchema, 
    ProductSchema 
};