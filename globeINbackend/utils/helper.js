const crypto = require('crypto');
exports.sendError =(res,error,status=401)=>{
    res
    .status(status)
    .json({success: false , error:error});
};

exports.createRandomBytes=()=> new Promise((resolve,reject)=>{
    crypto.randomBytes(30,(err,buff)=>{
     if(err) reject(err);
     const token = buff.toString('hex');
     resolve(token);
    });
});
const sendSuccess = (res, message) => {
    res.status(200).json({ success: true, message });
  };
  
  module.exports = { sendSuccess };
