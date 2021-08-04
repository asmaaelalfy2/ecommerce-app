const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
// import colors from 'colors'
const { NotFound, HandleError } = require('./middleware/errorMiddleware.js');
const connectDB = require('./config/db.js');

const productRoutes = require('./routes/productRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const uploadRoutes = require('./routes/uploadRoutes.js');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('API is running....');
// });

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')));

app.use(NotFound);
app.use(HandleError);

// const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(path.resolve(), '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(path.resolve(), 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

var PORT = process.env.PORT || 4000;

app.listen(PORT, function () {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
