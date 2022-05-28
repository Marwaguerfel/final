import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isSuperAdmin:{type:Boolean, required: true, default:false},
    isAdmin:{type:Boolean, required: true ,default:false },
    isDispatcher:{type:Boolean, required: true,default:false },

  },

);
const User = mongoose.model('User', userSchema);
export default User;