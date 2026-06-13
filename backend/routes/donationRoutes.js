const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
    createDonation,
    getAvailableDonations,
    getMyDonations,
    claimDonation,
    completeDonation
} = require('../controllers/donationController');

const router = express.Router();

router.post('/', protect, createDonation);
router.get('/', protect, getAvailableDonations);
router.get('/my', protect, getMyDonations);
router.put('/:id/claim', protect, claimDonation);
router.put('/:id/complete', protect, completeDonation);

module.exports = router;