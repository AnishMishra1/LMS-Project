import { Schema, model } from "mongoose";
import  bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import crypto from 'crypto'

const userSchema = new Schema ({
    fullName:{
        type: String,
        required: [true, 'Name is required'],
        minLength: [5, 'Name must be least 5 charater'],
        maxLength: [ 50, 'Name must be less than 50 charater'],
        lowercase: true,
        trim:true, 
    },
    email: {
        type: String,
        required: [true,'Email is required'],
        lowercase: true,
        trim: true,
        unique: true,
        // match: ["^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$, 'please provide valid email id']
    },
    password: {
        type: String,
        required: [ true, 'password is required'],
        minLength:[6, 'Must be min 6 charater is require in password'],
        select: false,
    },
    avatar: {
        public_id:{
            type: String,
        },
        secure_url:{
            type:String
        }
    },
    role:{
        type:String,
        enum:['USER','ADMIN'],
        default:'USER'

    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date
    
    
},{
    timestamps: true
});

userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        next();

    }

    this.password = await bcrypt.hash(this.password,10)
});


userSchema.methods.generateJWTToken =  function() {
        return  jwt.sign(
            { id:this._id, email:this.email, role:this.role },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY
            }
        )
    }
   
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}


userSchema.methods.generatePasswordResetToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.forgotPasswordToken = crypto
               .createHash("sha256")
              .update(resetToken)
              .digest("hex");
    this.forgotPasswordExpiry = Date.now()+ 15 * 60 * 1000; // 15 min from now

    return resetToken;
}


const User = model('User', userSchema);

export default User;

