const Donation = require('../models/Donation');

const createDonation = async (req, res) => {
    try {
        if (req.user.role !== 'Donor') {
            return res.status(403).json({ message: 'Only Donors can create donations' });
        }

        const { foodName, quantity, address, pickupTime } = req.body;

        const donation = await Donation.create({
            foodName,
            quantity,
            address,
            pickupTime,
            donorId: req.user.id
        });

        res.status(201).json(donation);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getAvailableDonations = async (req, res) => {
    try {
        const donations = await Donation.find({ status: 'available' }).populate('donorId', 'name');
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getMyDonations = async (req, res) => {
    try {
        const donations = await Donation.find({ donorId: req.user.id });
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const claimDonation = async (req, res) => {
    try {
        if (req.user.role !== 'NGO') {
            return res.status(403).json({ message: 'Only NGOs can claim donations' });
        }

        const donation = await Donation.findById(req.params.id);

        if (!donation || donation.status !== 'available') {
            return res.status(400).json({ message: 'Donation not available' });
        }

        const uniqueQrString = `DONATION-${donation._id}-${Date.now()}`;

        donation.status = 'claimed';
        donation.claimedBy = req.user.id;
        donation.qrCode = uniqueQrString;
        
        await donation.save();

        res.status(200).json(donation);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const completeDonation = async (req, res) => {
    try {
        if (req.user.role !== 'NGO') {
            return res.status(403).json({ message: 'Only NGOs can complete donations' });
        }

        const donation = await Donation.findById(req.params.id);

        if (!donation || donation.status !== 'claimed') {
            return res.status(400).json({ message: 'Donation cannot be completed' });
        }

        donation.status = 'completed';
        await donation.save();

        res.status(200).json(donation);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createDonation,
    getAvailableDonations,
    getMyDonations,
    claimDonation,
    completeDonation
};