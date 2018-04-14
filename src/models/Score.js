import mongoose, { Schema } from "mongoose";

const ScoreSchema = new Schema(
  {
    teamAName: String,
    teamBName: String,
    teamAScore: String,
    teamBScore: String
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Score", ScoreSchema);
