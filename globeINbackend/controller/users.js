const User = require('../model/users');
const VerificationToken = require('../model/verificationToken');
const ResetToken = require('../model/resetToken');
const { sendError, createRandomBytes } = require('../utils/helper');
const crypto =require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateOTP, mailTransport, generateEmailTemplate, plainEmailTemplate, generatePasswordResetTemplate, ResetPasswordEmailSuccess } = require('../utils/mail');
const { isValidObjectId } = require('mongoose');
exports.createUsers = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ success: false, error: 'This email is already exists' });
    }

    const newUser = new User({
        name,
        email,
        password,
    });
    const OTP = generateOTP();
    const verificationToken = new VerificationToken({
        owner: newUser._id,
        token: OTP,
    });
    await verificationToken.save();
    await newUser.save();
    mailTransport().sendMail({
        from: 'no-reply@gmall.com',
        to: newUser.email,
        subject: 'Verify your email account',
        html: generateEmailTemplate(OTP),
    });
    res.json({
        success: true,
        user: {
            name: newUser.name,
            email: newUser.email,
            id: newUser._id,
            verified: newUser.verified
        }
    });
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
 exports.verifyEmail = async(req, res) => {
    const { userId, otp } = req.body;
    if (!userId || !otp.trim()) {
        return res.status(400).json({ success: false, error: 'Invalid request, missing parameters!' });
    }
    if (!isValidObjectId(userId)) {
        return res.status(400).json({ success: false, error: 'Invalid UserId!' });
    }
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ success: false, error: 'User not found!' });
    }
    if (user.verified) {
        return res.status(400).json({ success: false, error: 'This account is already verified!' });
    }
    const token = await VerificationToken.findOne({ owner: user._id });
    if (!token) {
        return res.status(500).json({ success: false, error: 'Server error! Unable to find verification token.' });
    }
    const isMatched = await token.compareToken(otp);
    if (!isMatched) {
        return res.status(400).json({ success: false, error: 'Invalid token!' });
    }
    user.verified = true;
    await VerificationToken.findByIdAndDelete(token._id);
    await user.save();
    mailTransport().sendMail({
        from: 'no-reply@gmall.com',
        to: user.email,
        subject: `Welcome ${user.name}`,
        html: plainEmailTemplate('Your Email Has Been Confirmed', 'Thanks for connecting with GlobIN'),
    });
    res.status(200).json({
        success: true,
        message: 'Email Is Successfully Verified!',
        user: { name: user.name, email: user.email, id: user._id, token: token }
    });
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
 exports.updateProfile = async (req, res) => {
    const { userId } = req.params;
    const { name, email, password } = req.body;
    const image = req.files['image'] ? req.files['image'][0].path : '';
    if (!isValidObjectId(userId)) {
        return res.status(400).json({ success: false, error: 'Invalid User ID!' });
    }

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ success: false, error: 'User not found!' });
    }

    if (name) user.name = name.trim();
    if (email) user.email = email.trim();
    if (profilePic) user.profilePic = profilePic;

    if (password) {
        if (password.trim().length < 8 || password.trim().length > 20) {
            return sendError(res, 'Password must be between 8 and 20 characters long');
        }

        const isSamePassword = await user.comparePassword(password);
        if (isSamePassword) {
            return sendError(res, 'New password cannot be the same as the old password');
        }

        const hashedPassword = await bcrypt.hash(password.trim(), 8);
        user.password = hashedPassword;
    }

    await user.save();
    res.json({
        success: true,
        user: {
            name: user.name,
            email: user.email,
            profilePic: user.profilePic,
            verified: user.verified
        }
    });
};
*/
exports.updateProfile = async (req, res) => {
    const { userId } = req.params;
    const { name, email, password } = req.body;
    
    const image = req.files && req.files['image'] ? req.files['image'][0].path : ''; 
    
    if (!isValidObjectId(userId)) {
        return res.status(400).json({ success: false, error: 'Invalid User ID!' });
    }

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ success: false, error: 'User not found!' });
    }

    if (name) user.name = name.trim();
    if (email) user.email = email.trim();
    if (image) user.profilePic = image; 

    if (password) {
        if (password.trim().length < 8 || password.trim().length > 20) {
            return sendError(res, 'Password must be between 8 and 20 characters long');
        }

        const isSamePassword = await user.comparePassword(password);
        if (isSamePassword) {
            return sendError(res, 'New password cannot be the same as the old password');
        }

        const hashedPassword = await bcrypt.hash(password.trim(), 8);
        user.password = hashedPassword;
    }

    await user.save();
    res.json({
        success: true,
        user: {
            name: user.name,
            email: user.email,
            profilePic: user.profilePic,
            verified: user.verified
        }
    });
};

exports.getUserById = async (req, res) => {
    const { userId } = req.params;

    try {
        if (!isValidObjectId(userId)) {
            return res.status(400).json({ success: false, error: 'Invalid User ID!' });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found!' });
        }

        res.json({ success: true, user });
    } catch (error) {
        console.error('Error in getUserById:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};
 exports.logout = async (req, res) => {
    try {
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).json({ error: 'Failed to logout' });
    }
  };

/*
 exports.logout = (req, res) => {
    return sendSuccess(res, 'Logout successful');
  };
  
*/




/*
const blacklist = new Set(); 

exports.logout = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; 

    blacklist.add(token);

    res.json({ success: true, message: 'Logout successful' });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ success: false, error: 'Failed to logout' });
  }
};

*/


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
            