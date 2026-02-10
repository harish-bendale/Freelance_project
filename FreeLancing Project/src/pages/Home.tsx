import React from 'react';
import MapboxGurgaonMap from '../maps/MapboxGurgaonMap';

const Home: React.FC = () => {
    return (
        <div className="animate-fade-in">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Gurgaon Interactive</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
                    Explore sectors and premium projects across the city.
                    <br /> Zoom in to see more details.
                </p>
            </div>
            <MapboxGurgaonMap />
        </div>
    );
};

export default Home;
