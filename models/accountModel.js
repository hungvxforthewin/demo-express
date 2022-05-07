const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AcountSchema = new Schema(
    {
        username: String,
        password: String,
        avatar: String,
        description: String
    },
    { collection: "account" }
);

const AccountModel = mongoose.model("accounts", AcountSchema);
module.exports = AccountModel;
