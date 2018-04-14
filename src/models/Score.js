import mongoose, { Schema } from "mongoose";

const ScoreSchema = new Schema(
  {
    teamAName: String,
    teamBName: String,
    teamAScore: Number,
    teamBScore: Number
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Score", ScoreSchema);
