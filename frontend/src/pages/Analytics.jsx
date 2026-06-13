const Analytics = () => {
  const stats = [
    { title: 'Total Donations', value: '1,248', color: '#2196F3' },
    { title: 'Meals Rescued', value: '5,890', color: '#4CAF50' },
    { title: 'Active NGOs', value: '42', color: '#FF9800' },
    { title: 'CO2 Emissions Saved', value: '2,100 kg', color: '#9C27B0' }
  ];

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#333', fontSize: '2.5rem', marginBottom: '10px' }}>Global Impact Dashboard</h2>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>Real-time statistics of our zero-hunger initiative.</p>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {stats.map((stat, index) => (
          <div key={index} style={{ 
            backgroundColor: '#fff', 
            padding: '30px', 
            borderRadius: '12px', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            minWidth: '200px',
            textAlign: 'center',
            borderBottom: `5px solid ${stat.color}`
          }}>
            <h3 style={{ fontSize: '3rem', margin: '0', color: stat.color }}>{stat.value}</h3>
            <p style={{ fontSize: '1.1rem', color: '#555', fontWeight: 'bold', marginTop: '10px' }}>{stat.title}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '50px', backgroundColor: '#e8f5e9', padding: '30px', borderRadius: '12px', textAlign: 'center' }}>
        <h3 style={{ color: '#2e7d32', margin: '0 0 15px 0' }}>Recent Platform Activity</h3>
        <p style={{ margin: '5px 0', color: '#555' }}>🟢 <strong>UVCE Foundation</strong> just claimed 50 meals in Bangalore.</p>
        <p style={{ margin: '5px 0', color: '#555' }}>🟢 <strong>Fresh Bakery</strong> listed 10 boxes of surplus bread.</p>
        <p style={{ margin: '5px 0', color: '#555' }}>🟢 <strong>City Rescue</strong> completed a pickup of 20 kg of rice.</p>
      </div>
    </div>
  );
};

export default Analytics;