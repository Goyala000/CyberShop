import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

import users from './users.js';
import products from './products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Product.deleteMany()
        await User.deleteMany()
        await Order.deleteMany()

        const createdUser = await User.insertMany(users)

        const adminUser = createdUser[0]._id

        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser }
        })

        await Product.insertMany(sampleProducts)

        console.log('Data Added....'.blue.bold)
        process.exit();
    } catch (err) {
        console.error(`${err}`.red.inverse)
        process.exit(1);
    }
}

const deleteData = async () => {
    try {
        await Product.deleteMany()
        await User.deleteMany()
        await Order.deleteMany()

        console.log('Data Deleted....'.red.bold)
        process.exit();
    } catch (err) {
        console.error(`${err}`.red.inverse)
        process.exit(1);
    }
}

if(process.argv[2] === '-d') {
    deleteData()
} else {
    importData()
}