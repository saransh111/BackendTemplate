const express = require('express');
const mongoose = require('mongoose');
const ProductService = require('./Services/ProductServices');
const UserService = require('./Services/UserServices');
const jwt = require("jsonwebtoken");

const JWT_PASSWORD = process.env.REACT_APP_JWT_PASSWORD;

const app = express();

const productService = new ProductService();
const userService = new UserService();

app.use(express.json());

async function validation_result(req, res, next) {
    const validation_result = await userSchema.safeParse(req.body);
    if (!validation_result.success) {
        res.status(400).json({ msg: "Invalid Email ID or Password" });
    } else {
        next();
    }
}
async function decode_jwt(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_PASSWORD);
    req.body.id2 = decoded._id;
    next();
}

app.post('/products', decode_jwt,async (req, res) => {
    const product = await productService.addProduct(req.body.id2,req.body)
    res.status(201).json(product);
});


app.put('/products/:id', decode_jwt,async (req, res) => {
    const product = await productService.updateProduct(req.params.id,req.body.id2, req.body);
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

app.get('/products/:id', async (req, res) => {
    const product = await productService.getProduct(req.params.id);
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

app.delete('/products/:id',decode_jwt ,async (req, res) => {
    const result = await productService.removeProduct(req.params.id,req.body.id2);
    if (result) {
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

app.get('/products', decode_jwt,async (req, res) => {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
});

// User routes
app.post('/users', async (req, res) => {
    const user = await userService.addUser(req.body);
    const token = jwt.sign({ _id: user._id}, JWT_SECRET);
    res.set('Authorization', `Bearer ${token}`);
    res.status(201).json({ message: 'Login successful', username:user.username});
});

app.put('/users', decode_jwt,async (req, res) => {
    const user = await userService.updateUser(req.body.id2, req.body);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.get('/users', async (req, res) => {
    const user = await userService.getUser(req.username);
    if (user) {
        const token = jwt.sign({ _id: user._id}, JWT_SECRET);
        res.set('Authorization', `Bearer ${token}`);
        res.status(201).json({ message: 'Login successful', token });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.delete('/users',decode_jwt, async (req, res) => {
    const result = await userService.removeUser(req.body.id2);
    if (result) {
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.get('/users',decode_jwt ,async (req, res) => {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
