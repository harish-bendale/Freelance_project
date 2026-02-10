import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import RegionDetails from './pages/RegionDetails'

function App() {
  return (
    <Router>
      <div className="premium-container">
        <nav style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.5rem 0',
          marginBottom: '2rem'
        }} className="animate-fade-in">
          <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
            <span className="text-gradient">GURGAON</span>MAPS
          </div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {['Explore', 'Projects', 'Community', 'About'].map((item) => (
              <a
                key={item}
                href="/"
                style={{
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  transition: 'color 0.3s'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                {item}
              </a>
            ))}
          </div>
          <button className="btn-premium">Sign In</button>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/region/:regionId" element={<RegionDetails />} />
          </Routes>
        </main>

        <footer style={{
          marginTop: '6rem',
          paddingTop: '2rem',
          borderTop: '1px solid var(--glass-border)',
          textAlign: 'center',
          paddingBottom: '4rem'
        }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            &copy; 2026 Gurgaon Maps Explorer. All rights reserved.
          </p>
        </footer>
      </div>
    </Router>
  )
}

export default App
