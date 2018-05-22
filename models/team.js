import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const teamsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  place: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  players: {
    type: Array,
    required: true
  },
  joiningDate: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("teams", teamsSchema);
