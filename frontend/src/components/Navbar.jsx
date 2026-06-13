import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h2>🥗 Food Rescue</h2>
      </div>
      
      <div className="nav-center">
        <Link to="/">Home</Link>
        <Link to="/analytics">Impact</Link>
      </div>

      <div className="nav-right">
        {!token ? (
          <>
            <Link to="/login" className="btn-ghost small-btn">Login</Link>
            <Link to="/register" className="btn-primary small-btn">Register</Link>
          </>
        ) : (
          <>
            {role === 'Donor' && <Link to="/donor" className="nav-link">Dashboard</Link>}
            {role === 'NGO' && <Link to="/ngo" className="nav-link">Dashboard</Link>}
            <button onClick={handleLogout} className="btn-outline-danger small-btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;