const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
    },
    phoneNo: {
        type: String,
    },
    default: {
        type: Boolean,
        default: false
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: "Address"
});

const Address = mongoose.model("Address", AddressSchema);

module.exports = Address;
