const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AcountSchema = new Schema(
    {
        username: String,
        password: String,
    },
    { collection: "account" }
);

const AccountModel = mongoose.model("accounts", AcountSchema);
module.exports = AccountModel;
