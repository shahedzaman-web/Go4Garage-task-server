const mongoose = require("mongoose");

const vendorSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: 1,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});
const bcrypt = require("bcrypt");
let SALT = 10;

vendorSchema.pre("save", function (next) {
  var vendor = this;
  if (vendor.isModified("password")) {
    bcrypt.genSalt(SALT, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(vendor.password, salt, function (err, hash) {
        if (err) return next(err);
        vendor.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});
vendorSchema.methods.comparePassword = function (
  candidatePassword,
  checkPassword
) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return checkPassword(err);
    checkPassword(null, isMatch);
  });
};
const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = { Vendor };
