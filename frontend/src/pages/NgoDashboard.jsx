import { useState, useEffect } from 'react';
import API from '../services/api';
import DonationCard from '../components/DonationCard';
import QRScanner from '../components/QRScanner';

const NgoDashboard = () => {
  const [availableDonations, setAvailableDonations] = useState([]);
  const [showScanner, setShowScanner] = useState(false);

  const fetchDonations = async () => {
    try {
      const { data } = await API.get('/donations');
      setAvailableDonations(data);
    } catch (error) {
      console.error('Failed to fetch available donations');
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleClaim = async (id) => {
    try {
      await API.put(`/donations/${id}/claim`);
      fetchDonations();
    } catch (error) {
      console.error('Failed to claim donation');
    }
  };

  const handleScanSuccess = async (decodedText) => {
    setShowScanner(false);
    try {
      const donationId = decodedText.split('-')[1];
      if (!donationId) throw new Error('Invalid format');

      await API.put(`/donations/${donationId}/complete`);
      alert('Success: Food rescued and marked Completed!');
      fetchDonations();
    } catch (error) {
      alert('Failed to complete donation. Ensure it is a valid system QR.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #ccc', paddingBottom: '10px' }}>
        <h2>NGO Live Feed</h2>
        <button 
          onClick={() => setShowScanner(!showScanner)} 
          style={{ padding: '10px 20px', backgroundColor: '#000', color: '#fff', cursor: 'pointer', borderRadius: '5px', border: 'none' }}
        >
          {showScanner ? 'Close Scanner' : 'Scan QR Code'}
        </button>
      </div>

      {showScanner && (
        <div style={{ margin: '20px 0', padding: '20px', border: '2px dashed #000', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h3 style={{ textAlign: 'center' }}>Point camera at Donor's screen</h3>
          <QRScanner onScanSuccess={handleScanSuccess} />
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        {availableDonations.length === 0 ? (
          <p>No available donations at the moment. Keep refreshing.</p>
        ) : (
          availableDonations.map(donation => (
            <DonationCard
              key={donation._id}
              donation={donation}
              role="NGO"
              onClaim={handleClaim}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NgoDashboard;