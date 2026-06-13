import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333' }}>
      {/* Hero Section */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '80vh', 
        textAlign: 'center',
        padding: '0 20px',
        backgroundColor: '#f4fbf4'
      }}>
        <h1 style={{ fontSize: '3rem', color: '#2e7d32', marginBottom: '20px' }}>
          Rescue Food. Save Lives.
        </h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', marginBottom: '40px', color: '#555' }}>
          Bridge the gap between surplus food and those in need. Whether you are a restaurant with extra meals or an NGO ready to deliver, join our platform to make zero-hunger a reality.
        </p>
        
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="/register" style={{ 
            padding: '15px 30px', 
            backgroundColor: '#2e7d32', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '8px', 
            fontSize: '1.1rem',
            fontWeight: 'bold'
          }}>
            Join the Mission
          </Link>
          <Link to="/login" style={{ 
            padding: '15px 30px', 
            backgroundColor: 'transparent', 
            color: '#2e7d32', 
            textDecoration: 'none', 
            borderRadius: '8px', 
            fontSize: '1.1rem',
            fontWeight: 'bold',
            border: '2px solid #2e7d32'
          }}>
            Login to Dashboard
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '50px 20px', backgroundColor: '#fff', borderTop: '1px solid #eee' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', margin: '0', color: '#2e7d32' }}>Fast</h2>
          <p style={{ margin: '5px 0 0 0', color: '#777' }}>Real-time listing</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', margin: '0', color: '#2e7d32' }}>Secure</h2>
          <p style={{ margin: '5px 0 0 0', color: '#777' }}>QR Verification</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', margin: '0', color: '#2e7d32' }}>Impactful</h2>
          <p style={{ margin: '5px 0 0 0', color: '#777' }}>Direct to NGOs</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;