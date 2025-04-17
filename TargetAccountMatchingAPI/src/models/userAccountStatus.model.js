import mongoose from "mongoose";

const userAccountStatusSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  status: {
    type: String,
    enum: ["Target", "Not Target", "None"],
    default: "None",
  },
}, { timestamps: true });

const UserAccountStatus = mongoose.model("UserAccountStatus", userAccountStatusSchema);
export default UserAccountStatus;
