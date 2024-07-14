const express = require('express');
const mongoose = require('mongoose');
const ProductService = require('./Services/ProductServices');
const UserService = require('./Services/UserServices');

const app = express();

const productService = new ProductService();
const userService = new UserService();

app.use(express.json());


app.post('/products', async (req, res) => {
    const product = await productService.addProduct(req.body);
    res.status(201).json(product);
});


app.put('/products/:id', async (req, res) => {
    const product = await productService.updateProduct(req.params.id, req.body);
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

app.delete('/products/:id', async (req, res) => {
    const result = await productService.removeProduct(req.params.id);
    if (result) {
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

app.get('/products', async (req, res) => {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
});

// User routes
app.post('/users', async (req, res) => {
    const user = await userService.addUser(req.body);
    res.status(201).json(user);
});

app.put('/users/:id', async (req, res) => {
    const user = await userService.updateUser(req.params.id, req.body);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.get('/users/:id', async (req, res) => {
    const user = await userService.getUser(req.params.id);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.delete('/users/:id', async (req, res) => {
    const result = await userService.removeUser(req.params.id);
    if (result) {
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.get('/users', async (req, res) => {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
