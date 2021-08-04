const mongoose = require('mongoose');
const dotenv = require('dotenv');
const user = require('./data/users');
const products = require('./data/products');
const User = require('./models/userModel');
const Product = require('./models/productModel');

const Order = require('./models/orderModel');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await Order.deleteMany();

    await User.deleteMany();

    const createUser = await User.insertMany(user);
    const adminUser = createUser[0]._id;
    const sampleproducts = products.map((p) => {
      return { ...p, user: adminUser };
    });
    await Product.insertMany(sampleproducts);
    console.log('DATA iMPORTED');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await Order.deleteMany();

    await User.deleteMany();

    console.log('DATA DESTROYED');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] == '-d') {
  destroyData();
} else {
  importData();
}
