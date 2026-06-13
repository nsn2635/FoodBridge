const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    foodName: { type: String, required: true },
    quantity: { type: String, required: true },
    address: { type: String, required: true },
    pickupTime: { type: String, required: true },
    donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    status: { type: String, enum: ['available', 'claimed', 'completed'], default: 'available' },
    qrCode: { type: String, default: null }
}, { timestamps: true });

module.exports = mongoose.model('Donation', donationSchema);