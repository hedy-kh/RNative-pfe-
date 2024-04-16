const mongoose = require ('mongoose');
const bcrypt = require ('bcrypt');
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{ type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        required:true,
    },
    ProfilePic:{
        type:String,
        default:'',
    },
    verified:{
        type:Boolean,
        default:false,
        required:true,
    },
    googleId: { type: String },
    facebookId: { type: String }
}) ;

UserSchema.pre('save',async function(next){
 if (this.isModified('password')){
   const hash= await bcrypt.hash(this.password,8);
   this.password=hash;
 }
 next();
});
UserSchema.methods.comparePassword = async function(password){
    const result =await bcrypt.compareSync(password,this.password)
    return result;
} 

/*
// add plugin that converts methords to getter and setters
UserSchema.plugin(require('password-hash').PasswordHash);

UserSchema.methods.isValidPassword=function (password) {
   return this.comparePassword(password);
}
*/
module.exports = mongoose.model("User",UserSchema);