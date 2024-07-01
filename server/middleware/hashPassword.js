import bcrypt from 'bcrypt';

const hashPassword = async function(next) {
  if (this.isModified('password')) {
    const pass = this.password;
    console.log(pass);
    
    console.log(`password before hashing: ${this.password}`);
    this.password = await bcrypt.hash(this.password, 10);
    console.log(`password after hashing: ${this.password}`);
    
    this.confirm_password = undefined;
  }
  next();
};

export default hashPassword;
