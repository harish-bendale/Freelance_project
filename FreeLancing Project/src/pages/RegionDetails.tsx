import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { gurgaonSectors } from '../data/gurgaonSectors';
import { projects } from '../data/projects';
import MapboxRegionMap from '../maps/MapboxRegionMap';

const RegionDetails: React.FC = () => {
    const { regionId } = useParams<{ regionId: string }>();
    const region = gurgaonSectors.find(r => r.id === regionId);
    const regionProjects = projects.filter(p => p.regionId === regionId);

    if (!region) {
        return (
            <div style={{ textAlign: 'center', padding: '5rem' }}>
                <h2>Region not found</h2>
                <Link to="/" className="btn-premium" style={{ textDecoration: 'none', display: 'inline-block', marginTop: '2rem' }}>
                    Back to Map
                </Link>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: '2rem' }}>
                <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    ← Back to All Regions
                </Link>
            </div>
            <MapboxRegionMap region={region} projects={regionProjects} />
        </div>
    );
};

export default RegionDetails;
