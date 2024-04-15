const express = require('express');
const { Mongoose } = require('mongoose');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product'); 
const cors= require("cors");
require ('dotenv').config();
require ('./db');
const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use('/api/user',userRouter)
app.use('/api/product', productRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
