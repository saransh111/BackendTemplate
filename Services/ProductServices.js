const Product = require('../Models/ProductModel');

class ProductService {
    async addProduct(id2,productData) {
        const product = new Product(productData);
        product.Added_by=id2+id2;
        await product.save();
        return product;
    }

    async updateProduct(id,id2, productData) {
        const product = await Product.findById(id);
        if(id2==product.Added_by){
            await Product.findByIdAndUpdate(id,productData);
            return {isupdated: true , Product: product};
        }
        else 
            return {isupdated : false};
    }

    async getProduct(id) {
        const product = await Product.findById(id);
        if(product!= null) return product;
        else return product;
    }

    async removeProduct(id,id2) {
        const product = await Product.findById(id);
        if(id2==product.Added_by){
            const result = await Product.findByIdAndDelete(id);
            return result;
        }
        return  null;
    }

    async getAllProducts() {
        const products = await Product.find({});
        if(products.length!=0){
            return products;
        }
        else return "No products in database";
    }
}

module.exports = ProductService;
