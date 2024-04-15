const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/globindb',{
    useNewUrlParser:true,
    useUnifiedTopology:true,

}).then(()=>{console.log("db connected successfully")}).catch((err)=>{console.log(err)});