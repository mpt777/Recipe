import { Schema, model } from 'mongoose';
import crypto from 'crypto'; 

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },    
    email: {
        type: String,
        required: true,
        unique: true
    },
    hash: {
        type: String,
        required: true,
        select: false,
    },
    salt: {
        type: String,
        required: true,
        select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

// Method to set salt and hash the password for a user 
UserSchema.methods.setPassword = function(password) { 
     
    // Creating a unique salt for a particular user 
       this.salt = crypto.randomBytes(16).toString('hex'); 
     
       // Hashing user's salt and password with 1000 iterations, 
        
       this.hash = crypto.pbkdf2Sync(password, this.salt,  
       1000, 64, `sha512`).toString(`hex`); 
}; 
     
// Method to check the entered password is correct or not 
UserSchema.methods.validPassword = function(password) { 
    var hash = crypto.pbkdf2Sync(password,  
    this.salt, 1000, 64, `sha512`).toString(`hex`); 
    return this.hash === hash; 
}; 

UserSchema.methods.getResetPasswordToken = function() {
    //Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    //Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    //Set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

    return resetToken
}

UserSchema.methods.cleanJSON = function() {
    var obj = this.toObject();
    delete obj.hash;
    delete obj.salt;
    return obj;
   }

export const User = model('User', UserSchema)

// UserSchema.methods.getIdFromUsername = function(username) { 
//     try{
//         return User.findOne({username: username})
//     } 
//     catch {
//         return null
//     }
// }; 