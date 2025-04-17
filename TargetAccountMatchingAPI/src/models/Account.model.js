import mongoose from "mongoose";

const accountSchema = mongoose.Schema(
  {
    accountName: {
      type: String,
      required: true,
      unique: true,
    },

    industry: {
      type: String,
      required: true,
    },

    matchScore: {
      type: Number,
      required: true,
    },

    // status: {
    //   type: String,
    //   default: "none",
    // },
  },
  { timestamps: true }
);

const Account = mongoose.model("Account", accountSchema);
export default Account;
