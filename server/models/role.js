import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    validate: {
      validator: function(v) {
        return typeof v === 'string' || Array.isArray(v);
      },
      message: props => `${props.value} is not a valid role format!`
    }
  }
});

const User_role = mongoose.model('User_role', userSchema);

export default User_role;


