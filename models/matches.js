import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const matchesSchema = new Schema({
  teamone: {
    type: String,
    required: true
  },
  teamtwo: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  place: {
    type: String,
    required: true
  }
});

export default mongoose.model("matches", matchesSchema);
