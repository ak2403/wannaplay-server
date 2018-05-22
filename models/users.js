import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  userPassword: {
    type: String,
    required: true
  },
  userPhone: Number,
  joiningDate: {
    type: Date,
    default: Date.now
  },
  notification: {
    type: Schema.Types.Mixed
  }
});

export default mongoose.model("users", usersSchema);
