// Mapbox GL JS Configuration
export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || '';

// Map Style URLs
export const MAP_STYLES = {
    dark: 'mapbox://styles/mapbox/dark-v11',
    streets: 'mapbox://styles/mapbox/streets-v12',
    satellite: 'mapbox://styles/mapbox/satellite-streets-v12',
    light: 'mapbox://styles/mapbox/light-v11',
    standard: 'mapbox://styles/mapbox/standard',
};

// Default Map Settings
export const DEFAULT_MAP_CONFIG = {
    style: MAP_STYLES.standard, // Realistic 3D Buildings style
    pitch: 60, // Steeper generic 3D tilt
    bearing: -15, // Slight rotation
    antialias: true, // Smooth 3D rendering
};

// Gurgaon Map Settings
export const GURGAON_MAP_CONFIG = {
    center: [77.0697, 28.4021] as [number, number], // Centered near Sector 58-59 (Golf Course Extn)
    zoom: 13.5,
    pitch: 65,
    bearing: -10,
};

// Region Detail Map Settings
export const REGION_MAP_CONFIG = {
    pitch: 65,
    bearing: -20,
    zoom: 16,
};

// Layer IDs
export const LAYER_IDS = {
    buildings: 'building-3d',
    sectors: 'sectors-fill',
    sectorsOutline: 'sectors-outline',
    projects: 'projects-markers',
    cityBoundary: 'city-boundary',
};

// Color Palette (New Investment Corridor Theme)
export const COLORS = {
    accentPrimary: '#FFD700', // Gold for boundaries/highlights
    accentSecondary: '#4CAF50', // Green for nature/growth
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.9)',
    glassBorder: 'rgba(255, 215, 0, 0.3)', // Gold tint glass
    cardBg: 'rgba(20, 20, 20, 0.85)', // Dark premium card background
};
