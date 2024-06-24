//Database connectivity
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

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
        required:true,
        minLength:1,
        maxLength:15
    },
    confirm_password:{
        type:String,
        required:true,
        minLength:1,
        maxLength:15
    }
})

// define function to generate jwt token and keep in mind that what to use .methods or .statics while defining a function


student_schema.pre("save", async function (next){
    if(this.isModified("password")){
        // const hashpassword=await bcrypt.hash(password,10);
        console.log(`password before hashing:- ${this.password}`)
        this.password=await bcrypt.hash(this.password,10)
        console.log(`password after hashing:- ${this.password}`)
        this.confirm_password=undefined;
    }
   next()
})
//as we are defining class so make sure that first letter should be capital
const student=new mongoose.model("student",student_schema);

export default student;