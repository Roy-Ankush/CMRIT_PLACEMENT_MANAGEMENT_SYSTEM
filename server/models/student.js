//Database connectivity
import mongoose from "mongoose";
import validator from "validator";
// import bcrypt from "bcrypt";
import hashPassword from "../middleware/hashPassword.js";

const student_schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: [true, "Given email is already exist in database"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email address!")
            }
        }
        
    },
    password:{
        type:String,
        // required:true,
        minLength:1,
        maxLength:15
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true  // Allows null or empty values but enforces uniqueness
    },
    displayName: {
        type: String
    },
    image: {
        type: String // URL of the profile picture
    },
    confirm_password:{
        type:String,
        // required:true,
        minLength:1,
        maxLength:15
    }
})

// define function to generate jwt token and keep in mind that what to use .methods or .statics while defining a function


// student_schema.pre("save", async function (next){
//     const pass=this.password;
//     console.log(pass)
//     if(this.isModified("password")){
//         // const hashpassword=await bcrypt.hash(password,10);
//         console.log(`password before hashing:- ${this.password}`)
//         this.password=await bcrypt.hash(this.password,10)
//         console.log(`password after hashing:- ${this.password}`)
//         this.confirm_password=undefined;
//     }
//    next()
// })

student_schema.pre('save', hashPassword);
//as we are defining class so make sure that first letter should be capital
const student=new mongoose.model("student",student_schema);

export default student;