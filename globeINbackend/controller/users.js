const User = require('../model/users');
const VerificationToken = require('../model/verificationToken');
const ResetToken = require('../model/resetToken');
const { sendError, createRandomBytes } = require('../utils/helper');
const crypto =require('crypto');
const jwt = require('jsonwebtoken');
const { generateOTP, mailTransport, generateEmailTemplate, plainEmailTemplate, generatePasswordResetTemplate, ResetPasswordEmailSuccess } = require('../utils/mail');
const { isValidObjectId } = require('mongoose');
exports.createUsers  = async (req, res) => {
    const {name,email,password}=req.body;
    const user = await User.findOne({email})
    if (user) 
    return sendError(res,'this email is already exists')
    const newUser= new User({
        name,
        email,
        password,
    });
    const OTP = generateOTP();
    const verificationToken = new VerificationToken({
        owner:newUser._id,
        token:OTP,
    });
    await verificationToken.save();
    await newUser.save();
    mailTransport().sendMail({
        from:'no-reply@gmall.com',
        to:newUser.email,
        subject:"verify your email account",
        html:generateEmailTemplate(OTP),
    });
    res.json({success:true,user:{name:newUser.name,email:newUser.email,id:newUser._id,verified:newUser.verified}});
};
 exports.SignIn=async (req,res)=>{
    const {email,password} =req.body;
    if(!email.trim()||!password.trim()) return sendError(res,'email or password is missing')
    const user =await User.findOne({email});
    
    if (!user)return sendError(res,"User not found");
    const isMatched = await user.comparePassword(password);
    if (!isMatched) return sendError(res,"Invalid Password/email ")
     const token= jwt.sign({userId:user._id},process.env.JWT_SECRET,{
        expiresIn:'1d'
    });
    res.json({
        success:true,
        user:{name:user.name,email:user.email,id:user._id,token:token},});
 };
 exports.verifyEmail = async(req,res)=>{
    const {userId,otp}=req.body;
    if (!userId || !otp.trim() ) return sendError(res,'invalid request,missing parameters !');
    if(!isValidObjectId(userId)) return sendError(res,'invalid UserId !');
    const user=await User.findById(userId);
    if(!user)return sendError(res,'user not found !');
    if(user.verified)return sendError(res,'this account is already verified !');
    const token=await VerificationToken.findOne({owner:user._id});
    if(!token)return sendError(res,'server error ! or we didnt find user');
    //if(token.createdAt+360000<Date.now())return sendError(res,'Verification link has been expired !');
    const isMatched = await token.compareToken(otp);
    if(!isMatched) return sendError(res,'Invalid token ');
    user.verified=true;
    await VerificationToken.findByIdAndDelete(token._id);
    await user.save();
    mailTransport().sendMail({
        from:'no-reply@gmall.com',
        to:user.email,
        subject:`welcome ${user.name}`,
        html:plainEmailTemplate('Your Email Has Been Confirmed','thanks for connecting with GlobIN'),
    });
    res.status(200).json({message:'Email Is Successfully Verified!', user:{name:user.name,email:user.email,id:user._id,token:token}});
 };
 exports.forgetPassword =async(req,res)=>{
  const {email}=req.body;
  if(!email) return sendError(res,'Please provide valid email');
  const user=await User.findOne({email});
  if(!user) return sendSuccess(res,'User not found,invalid request');
  const token =await ResetToken.findOne({owner:user._id});
  if (token) return sendError(res,'Only after one hour you can request for another token')
  const randomBytes = await createRandomBytes();
  const resetToken = new ResetToken({ owner: user._id ,token:randomBytes});
  await resetToken.save();
 mailTransport().sendMail({
   from:"no-reply@gmall.com",
   to:email,
   subject:" Password Recovery ",
   html : generatePasswordResetTemplate(`http://localhost:3000/reset-password?token=${randomBytes}&id=${user._id}`),
});
 res.json({success:true,message:'password reset link sent to your email check your inbox'});
};
 exports.resetPassword = async(req,res)=>{
    const{password}=req.body;
    const user=await User.findById(req.user._id);
    if(!user) return sendError(res,'user not found');
    const isSamePassword=await user.comparePassword(password);
    if(isSamePassword) return sendError(res,"new password cannot be same as old password");
    if(password.trim().length<8||password.trim().length>20)
    return sendError(res,'password must be 8 to 20 characters long');
    user.password=password.trim();
    await user.save();
    await ResetToken.findOneAndDelete({owner:user._id});
    mailTransport().sendMail({
        from:"no-reply@gmall.com",
        to:user.email,
        subject:" Password Reset successfully ",
        html :ResetPasswordEmailSuccess('password reset successfully','Now you can login with new password'),
     });
    res.json({success:true,message:"password reset successfully"});
 };
 



             /*
exports.login=(req,res)=>{
    const{email,password}=req.body;
     User.findOne({email},(err,data)=>{
         if(!data){
             return res.status(401).json({
                 success: false,
                 message: "Authentication failed!",
             })
         }else{
            data.isCorrectPassword(password,(err,same)=> {
                if (!same) {
                   return res.status(401).json({
                       success: false,
                       message: "Authentication failed!"
                   })
               } else {
                   // remove password before sending the response
                   delete data.password
                   let token = data.getToken()
                   res.header("auth-token",token).json({
                       success: true,
                       token: token,
                       user: data
                   })
               }
           })
         }
     })
}

exports.profile=(req,res)=>{
    res.send(req.user);
}

exports.updateProfile=(req,res)=>{
    User.findByIdAndUpdate(req.user._id , req.body, {new:true}, (err, updatedUser)=>{
        if(!updatedUser){
            return res.status(422).json({success:false,message:"Updated Failed"})
        }else{
            res.json({success:true,message:'Profile Updated Successfully',user:updatedUser});
        }
    });
}

// export const uploadPhoto=multer({storage}).single('photo');  
const uploadPhoto=require('../middleware/upload')    
             
*/
            