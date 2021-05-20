const mongoose = require("mongoose");

const productListSchema = mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Price: {
    type: String,
    required: true,
  },
});

const ProductList = mongoose.model("ProductList", productListSchema);

module.exports = { ProductList };
