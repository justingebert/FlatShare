const mongoose = require("mongoose"),
  shoppingSchema = mongoose.Schema({
    name: String,
    email: String,
    zipCode: Number
});

module.exports = mongoose.model("Shopping", shoppingSchema);
