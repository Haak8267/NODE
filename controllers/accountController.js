
// ===============================
// Create a new account linked to a specific bank
const createAccountController = async (req, res) => {
  try {
    const { name, number, accountType, bankId } = req.body;
    // Validate required fields
    if (!name || !number || !bankId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    // Optional: check if the bank exists before creating account
    const bankExists = await BankModel.findById(bankId);
    if (!bankExists) {
      return res.status(404).json({ message: "Bank not found" });
    }
    const account = new AccountModel({ name, number, accountType, bankId });
    const result = await account.save();
    res.json({ message: "Account created successfully", data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating account" });
  }
};
module.exports = {
  createAccountController,
};
