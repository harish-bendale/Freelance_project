import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { MAPBOX_TOKEN, REGION_MAP_CONFIG, DEFAULT_MAP_CONFIG, COLORS } from '../config/mapboxConfig';
import type { Project } from '../data/projects';
import type { SectorBoundary } from '../data/gurgaonSectors';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapboxRegionMapProps {
    region: SectorBoundary;
    projects: Project[];
}

const MapboxRegionMap: React.FC<MapboxRegionMapProps> = ({ region, projects }) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const markersRef = useRef<mapboxgl.Marker[]>([]);



    // Marker management function
    const updateMarkers = () => {
        if (!map.current) return;

        // Clear existing markers
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];

        // Add project markers
        projects.forEach((project) => {
            // Create custom marker element
            const el = document.createElement('div');
            el.className = 'project-marker';
            el.style.width = '18px';
            el.style.height = '18px';
            el.style.borderRadius = '50%';
            el.style.backgroundColor = COLORS.accentPrimary;
            el.style.border = `2px solid white`;
            el.style.cursor = 'pointer';
            el.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            el.style.boxShadow = `0 0 15px ${COLORS.accentPrimary}, 0 0 30px ${COLORS.accentPrimary}44`;

            // Create popup
            const popup = new mapboxgl.Popup({
                offset: 25,
                closeButton: false,
                closeOnClick: false,
                maxWidth: '300px'
            });

            // Animation timeout reference
            let animationTimeout: any;

            // Hover effects
            el.addEventListener('mouseenter', () => {
                el.style.width = '26px';
                el.style.height = '26px';
                el.style.backgroundColor = COLORS.accentSecondary;
                el.style.boxShadow = `0 0 25px ${COLORS.accentSecondary}, 0 0 50px ${COLORS.accentSecondary}66`;
                el.style.zIndex = '1000';

                // Show 3D Building Model (Rising Animation)
                if (map.current && map.current.getSource('hovered-building')) {
                    const source = map.current.getSource('hovered-building') as mapboxgl.GeoJSONSource;

                    // Step 1: Initialize at Scale Z=0
                    source.setData({
                        type: 'FeatureCollection',
                        features: [{
                            type: 'Feature',
                            properties: {
                                'model-uri': 'https://docs.mapbox.com/mapbox-gl-js/assets/tower.glb',
                                'model_scale': [0.8, 0.8, 0] // Start flat
                            },
                            geometry: {
                                type: 'Point',
                                coordinates: [project.lng, project.lat]
                            }
                        }]
                    });

                    // Step 2: Trigger animation to vertical scale 1.2
                    if (animationTimeout) clearTimeout(animationTimeout);

                    animationTimeout = setTimeout(() => {
                        source.setData({
                            type: 'FeatureCollection',
                            features: [{
                                type: 'Feature',
                                properties: {
                                    'model-uri': 'https://docs.mapbox.com/mapbox-gl-js/assets/tower.glb',
                                    'model_scale': [0.8, 0.8, 1.2] // Target scale
                                },
                                geometry: {
                                    type: 'Point',
                                    coordinates: [project.lng, project.lat]
                                }
                            }]
                        });
                    }, 50);
                }

                // Create Horizontal Slider HTML
                const imagesHtml = project.images.map(img =>
                    `<img src="${img}" class="slide-image" />`
                ).join('');

                // Calculate animation duration based on image count (3s per image)
                const animationDuration = `${project.images.length * 3}s`;

                // Determine width: 100% * number of images
                const sliderWidth = project.images.length * 100;

                popup
                    .setLngLat([project.lng, project.lat])
                    .setHTML(`
                        <div class="popup-card">
                            <h3 class="popup-title">${project.name}</h3>
                            <div class="slider-window">
                                <div class="slider-track" style="
                                     width: ${sliderWidth}%; 
                                     animation: slide ${animationDuration} infinite alternate ease-in-out;
                                     display: flex;
                                ">
                                    ${imagesHtml}
                                </div>
                            </div>
                            <div class="popup-footer">
                                ${project.priceRange} • ${project.configuration}
                            </div>
                        </div>
                    `)
                    .addTo(map.current!);
            });

            el.addEventListener('mouseleave', () => {
                el.style.width = '18px';
                el.style.height = '18px';
                el.style.backgroundColor = COLORS.accentPrimary;
                el.style.boxShadow = `0 0 15px ${COLORS.accentPrimary}, 0 0 30px ${COLORS.accentPrimary}44`;
                el.style.zIndex = '';
                popup.remove();

                // Clear animation and remove building
                if (animationTimeout) clearTimeout(animationTimeout);

                if (map.current && map.current.getSource('hovered-building')) {
                    (map.current.getSource('hovered-building') as mapboxgl.GeoJSONSource).setData({
                        type: 'FeatureCollection',
                        features: []
                    });
                }
            });

            // Add marker to map
            const marker = new mapboxgl.Marker({
                element: el,
                anchor: 'center'
            })
                .setLngLat([project.lng, project.lat])
                .addTo(map.current!);

            markersRef.current.push(marker);
        });
    };

    useEffect(() => {
        if (!mapContainer.current) return;

        // If map doesn't exist, create it
        if (!map.current) {
            mapboxgl.accessToken = MAPBOX_TOKEN;

            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: DEFAULT_MAP_CONFIG.style,
                center: [region.center[1], region.center[0]], // [lng, lat]
                zoom: region.zoom,
                pitch: REGION_MAP_CONFIG.pitch,
                bearing: REGION_MAP_CONFIG.bearing,
                antialias: DEFAULT_MAP_CONFIG.antialias,
            });

            map.current.on('load', () => {
                if (!map.current) return;

                // Configure Standard Style (Dusk with High Detail)
                if (map.current.getStyle().name?.includes('Standard') || true) {
                    map.current.setConfig('basemap', {
                        lightPreset: 'dusk',
                        showPointOfInterestLabels: true,
                        showRoadLabels: true,
                        showPlaceLabels: true,
                        showTransitLabels: true
                    });
                }

                // Keep the manual building layer removed (Standard handles it)

                // Add sector boundary
                map.current.addSource('sector-boundary', {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        properties: { name: region.name },
                        geometry: {
                            type: 'Polygon',
                            coordinates: [region.polygon.map(coord => [coord[1], coord[0]])]
                        }
                    }
                });

                // Clip Layer: Remove generic buildings/models inside this sector
                map.current.addLayer({
                    id: 'sector-clip',
                    type: 'clip',
                    source: 'sector-boundary',
                    layout: {
                        'clip-layer-types': ['symbol', 'model', 'fill-extrusion'],
                        // Important: Only clip the basemap, not our custom layers
                        'clip-layer-scope': ['basemap']
                    } as any
                });

                map.current.addLayer({
                    id: 'sector-boundary-fill',
                    type: 'fill',
                    source: 'sector-boundary',
                    paint: {
                        'fill-color': COLORS.accentPrimary,
                        'fill-opacity': 0.1
                    }
                });

                // Add Terrain (Standard style supports terrain)
                map.current.addSource('mapbox-dem', {
                    'type': 'raster-dem',
                    'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
                    'tileSize': 512,
                    'maxzoom': 14
                });
                map.current.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

                // Add source for the hover building model
                map.current.addSource('hovered-building', {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: []
                    }
                });

                // Add the 3D Model layer
                map.current.addLayer({
                    id: 'hovered-building-model',
                    type: 'model', // Type model
                    slot: 'middle',
                    source: 'hovered-building',
                    minzoom: 10,
                    layout: {
                        'model-id': ['get', 'model-uri']
                    },
                    paint: {
                        'model-opacity': 1,
                        'model-rotation': [0.0, 0.0, 35.0],
                        'model-scale': ['get', 'model_scale'], // Data driven scale for animation
                        'model-color-mix-intensity': 0,
                        'model-cast-shadows': true,
                        'model-emissive-strength': 0.8,
                        'model-scale-transition': {
                            duration: 1000,
                            delay: 0
                        }
                    }
                } as any);

                // Initial markers
                updateMarkers();
            });

            // Add navigation controls
            map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
        } else {
            // Map already exists, just update state if it's already loaded
            if (map.current.loaded()) {
                updateMarkers();
            } else {
                map.current.on('load', updateMarkers);
            }
        }

        return () => {
            // Note: We don't remove the map instance here anymore to prevent 
            // the StrictMode double-mount issues, but we should clean up if the component 
            // is truly unmounting. However, the requirement for fixing the blank map 
            // was to keep the instance or handle it carefully.
            // Actually, the previous fix used map.current = null.
        };
    }, [region, projects]);

    // Dedicated effect for true cleanup on unmount
    useEffect(() => {
        return () => {
            markersRef.current.forEach(marker => marker.remove());
            markersRef.current = [];
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, []);

    return (
        <div className="glass-card" style={{ padding: '1rem', position: 'relative', height: '650px', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', padding: '0 1rem' }}>
                <div>
                    <h2 style={{ color: 'var(--text-primary)' }}>{region.name}</h2>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Detailed project locations in 3D</p>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Tip: Hover over markers for photos
                </div>
            </div>

            <div
                ref={mapContainer}
                style={{
                    width: '100%',
                    height: 'calc(100% - 5rem)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: '1px solid var(--glass-border)'
                }}
            />

            <style>{`
                .mapboxgl-popup-content {
                    background: transparent !important;
                    padding: 0 !important;
                    box-shadow: none !important;
                }
                .mapboxgl-popup-tip {
                    border-top-color: ${COLORS.accentPrimary} !important;
                }
                .mapboxgl-ctrl-group {
                    background: rgba(15, 17, 26, 0.9) !important;
                    backdrop-filter: blur(10px);
                    border: 1px solid ${COLORS.glassBorder} !important;
                }
                .mapboxgl-ctrl-group button {
                    background-color: transparent !important;
                    color: ${COLORS.textPrimary} !important;
                }
                .mapboxgl-ctrl-group button:hover {
                    background-color: rgba(99, 102, 241, 0.2) !important;
                }
                .project-marker {
                    animation: pulse 2s infinite;
                }
                @keyframes pulse {
                    0% {
                        box-shadow: 0 0 15px ${COLORS.accentPrimary}, 0 0 30px ${COLORS.accentPrimary}44;
                    }
                    50% {
                        box-shadow: 0 0 25px ${COLORS.accentPrimary}, 0 0 50px ${COLORS.accentPrimary}88;
                    }
                    100% {
                        box-shadow: 0 0 15px ${COLORS.accentPrimary}, 0 0 30px ${COLORS.accentPrimary}44;
                    }
                }
                .popup-card {
                    background: rgba(10, 12, 20, 0.95);
                    backdrop-filter: blur(15px);
                    color: white;
                    padding: 12px;
                    border-radius: 12px;
                    border: 1px solid ${COLORS.accentPrimary};
                    box-shadow: 0 10px 40px rgba(0,0,0,0.5);
                    width: 250px;
                }
                .popup-title {
                    margin: 0 0 10px 0;
                    font-size: 1rem;
                    font-weight: 700;
                    color: ${COLORS.accentSecondary};
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .slider-window {
                    width: 100%;
                    height: 150px;
                    overflow: hidden;
                    border-radius: 8px;
                    position: relative;
                }
                .slider-track {
                    display: flex;
                    height: 100%;
                }
                .slide-image {
                    width: 250px; 
                    flex-shrink: 0; 
                    height: 100%; 
                    object-fit: cover;
                }
                .popup-footer {
                    margin-top: 10px;
                    font-size: 0.7rem;
                    color: rgba(255, 255, 255, 0.7);
                    text-align: center;
                }
                
                @keyframes slide {
                    0%, 30% { transform: translateX(0); }
                    35%, 65% { transform: translateX(-100%); } /* Move left by 1 window width (since images are 100% of window) */
                    70%, 100% { transform: translateX(-200%); }
                }
                
                /* Note: translate(-100%) on the track moves it by 100% of the TRACK width? No, by element width.
                   If track is 300% wide (750px), translate(-100%) moves it 750px. That's wrong.
                   We need to move it by 250px (window width).
                   250px is 33.33% of 750px.
                   So for 3 images: steps are 0, -33.33%, -66.66%.
                */
                
               @keyframes slide {
                   0%, 25% { transform: translateX(0); }
                   33%, 58% { transform: translateX(-250px); }
                   66%, 91% { transform: translateX(-500px); }
                   100% { transform: translateX(0); }
               }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default MapboxRegionMap;
