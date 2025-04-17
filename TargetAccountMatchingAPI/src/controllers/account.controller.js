import Account from "../models/Account.model.js";
import UserAccountStatus from "../models/userAccountStatus.model.js";

// get all accounts
export const getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({});
    if (!accounts) {
      return res.status(400).json({
        success: false,
        message: "No Accounts found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successful",
      data: accounts,
    });
  } catch (error) {
    console.log("Error :", error);
    res.status(400).json({
      success: false,
      message: "No Accounts found",
    });
  }
};

//get account on id
export const getAccount = async (req, res) => {
  const id = req.params.id;

  try {
    const account = await Account.findById(id);
    res.status(200).json({
      success: true,
      message: "successful",
      data: account,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Account Not Found" });
  }
};

//updating status on id
export const updateAccountStatus = async (req, res) => {
  const accountId = req.params.id;
  const userId = req.user._id;
  const { status } = req.body;
  const allowedStatuses = ["Target", "Not Target", "None"];

  if (!status) {
    return res.status(400).json({
      success: false,
      message: "Missing required field",
    });
  }

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Please provide one of these (Target, Not Target, none)",
    });
  }

  try {
    // const updatedAccount = await Account.findByIdAndUpdate(
    //   id,
    //   { $set: { status } },
    //   { new: true }
    // );
    const account = await Account.findById(accountId);

    if (!account) {
      return res
        .status(404)
        .json({ success: false, message: "Account not found" });
    }

    //user specific status updation
    const userStatus = await UserAccountStatus.findOneAndUpdate(
      { user: userId, account: accountId },
      { status },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      success: true,
      message: "Account status updated successfully",
      data: userStatus,
    });
  } catch (error) {
    console.error("Error updating account status:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update account status" });
  }
};
