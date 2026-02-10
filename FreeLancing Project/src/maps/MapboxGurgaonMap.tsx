import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import { MAPBOX_TOKEN, GURGAON_MAP_CONFIG, DEFAULT_MAP_CONFIG, COLORS } from '../config/mapboxConfig';
import { gurgaonSectors } from '../data/gurgaonSectors';
import { premiumProjects } from '../data/projects';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxGurgaonMap: React.FC = () => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const markersRef = useRef<mapboxgl.Marker[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!mapContainer.current || map.current) return;

        mapboxgl.accessToken = MAPBOX_TOKEN;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: DEFAULT_MAP_CONFIG.style,
            center: GURGAON_MAP_CONFIG.center,
            zoom: GURGAON_MAP_CONFIG.zoom,
            pitch: GURGAON_MAP_CONFIG.pitch,
            bearing: GURGAON_MAP_CONFIG.bearing,
            antialias: DEFAULT_MAP_CONFIG.antialias,
        });

        const addMarkers = () => {
            // Clear existing markers
            markersRef.current.forEach(marker => marker.remove());
            markersRef.current = [];

            premiumProjects.forEach((project) => {
                const el = document.createElement('div');
                el.className = 'project-marker-card';

                let detailsHtml = '';
                if (project.details && project.details.length > 0) {
                    detailsHtml = project.details.map(d => `<div class="marker-detail">${d}</div>`).join('');
                }

                el.innerHTML = `
                    <div class="marker-content ${project.highlight ? 'highlight' : ''}">
                        ${project.logo ? `<img src="${project.logo}" class="marker-logo" alt="${project.name}" />` : ''}
                        <div class="marker-title">${project.name}</div>
                        ${detailsHtml}
                    </div>
                    <div class="marker-stem"></div>
                `;

                // Add click handler
                el.addEventListener('click', () => {
                    map.current?.flyTo({
                        center: project.coordinates,
                        zoom: 16,
                        pitch: 60,
                        bearing: -20,
                        essential: true
                    });
                });

                const marker = new mapboxgl.Marker({
                    element: el,
                    anchor: 'bottom'
                })
                    .setLngLat(project.coordinates)
                    .addTo(map.current!);

                markersRef.current.push(marker);
            });
        };

        map.current.on('load', () => {
            if (!map.current) return;

            // Configure Standard Style (Dusk with High Detail)
            if (map.current.getStyle().name?.includes('Standard') || true) {
                map.current.setConfig('basemap', {
                    lightPreset: 'dusk', // Reverted to Dusk as requested
                    showPointOfInterestLabels: true, // Enabled for more detail
                    showRoadLabels: true,
                    showPlaceLabels: true,
                    showTransitLabels: true // Enabled for more detail
                });
            }

            // Note: 'standard' style automatically includes 3D buildings. 

            // Add sectors (Plots)
            map.current.addSource('sectors', {
                type: 'geojson',
                generateId: true,
                data: {
                    type: 'FeatureCollection',
                    features: gurgaonSectors.map((sector) => ({
                        type: 'Feature',
                        properties: {
                            id: sector.id,
                            name: sector.name,
                            zone: sector.zone
                        },
                        geometry: {
                            type: 'Polygon',
                            coordinates: [sector.polygon.map(coord => [coord[1], coord[0]])]
                        }
                    }))
                }
            });

            // Clip Layer: Removes generic 3D buildings/models from our sectors
            map.current.addLayer({
                id: 'sectors-clip',
                type: 'clip',
                source: 'sectors',
                layout: {
                    'clip-layer-types': ['symbol', 'model', 'fill-extrusion']
                }
            });

            // Green "Lawn" fill for sectors
            map.current.addLayer({
                id: 'sectors-fill',
                type: 'fill',
                source: 'sectors',
                paint: {
                    'fill-color': COLORS.accentSecondary,
                    'fill-opacity': 0.2 // More transparent to let the ground texture show
                }
            });

            // Gold Outline for sectors
            map.current.addLayer({
                id: 'sectors-outline',
                type: 'line',
                source: 'sectors',
                paint: {
                    'line-color': COLORS.accentPrimary,
                    'line-width': 2,
                    'line-opacity': 0.8
                }
            });

            addMarkers();

            // Add Terrain (Realism - Aravallis) - Standard style supports this
            map.current.addSource('mapbox-dem', {
                'type': 'raster-dem',
                'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
                'tileSize': 512,
                'maxzoom': 14
            });
            map.current.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

            // Note: Standard style handles Sky/Fog automatically based on lightPreset.
            // Removing manual setFog/addLayer('sky') to avoid conflicts.
        });

        // Click to navigate
        map.current.on('click', 'sectors-fill', (e) => {
            if (e.features && e.features.length > 0) {
                const sectorId = e.features[0].properties?.id;
                if (sectorId) {
                    navigate(`/region/${sectorId}`);
                }
            }
        });

        // Hover interactions for sectors
        let hoveredStateId: number | null = null;

        map.current.on('mousemove', 'sectors-fill', (e) => {
            if (!map.current || !e.features || e.features.length === 0) return;

            map.current.getCanvas().style.cursor = 'pointer';

            const feature = e.features[0];
            const featureId = feature.id as number;

            if (hoveredStateId !== null && hoveredStateId !== featureId) {
                map.current.setFeatureState(
                    { source: 'sectors', id: hoveredStateId },
                    { hover: false }
                );
            }

            hoveredStateId = featureId;
            map.current.setFeatureState(
                { source: 'sectors', id: hoveredStateId },
                { hover: true }
            );
        });

        map.current.on('mouseleave', 'sectors-fill', () => {
            if (!map.current) return;

            map.current.getCanvas().style.cursor = '';

            if (hoveredStateId !== null) {
                map.current.setFeatureState(
                    { source: 'sectors', id: hoveredStateId },
                    { hover: false }
                );
            }
            hoveredStateId = null;
        });

        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

        return () => {
            markersRef.current.forEach(m => m.remove());
            map.current?.remove();
            map.current = null;
        };
    }, []);

    return (
        <div className="glass-card" style={{ padding: '0', position: 'relative', height: '80vh', overflow: 'hidden', borderRadius: '24px', border: `1px solid ${COLORS.glassBorder}` }}>

            {/* Overlay Header */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 10,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)',
                padding: '2rem',
                textAlign: 'center',
                pointerEvents: 'none'
            }}>
                <h1 style={{
                    fontFamily: 'var(--font-heading)',
                    color: COLORS.textPrimary,
                    fontSize: '2.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    margin: 0,
                    textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                }}>
                    The New <span style={{ color: COLORS.accentPrimary }}>Investment Corridor</span>
                </h1>
            </div>

            <div
                ref={mapContainer}
                style={{
                    width: '100%',
                    height: '100%',
                }}
            />

            <style>{`
                .project-marker-card {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    pointer-events: auto;
                    cursor: pointer;
                    transform: translateZ(0); /* Hardware accel */
                }
                
                .marker-content {
                    background: ${COLORS.cardBg};
                    backdrop-filter: blur(8px);
                    border: 1px solid ${COLORS.accentPrimary};
                    border-radius: 8px;
                    padding: 8px 12px;
                    color: white;
                    text-align: center;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.5);
                    min-width: 120px;
                    transition: transform 0.2s;
                }
                
                .marker-content:hover {
                    transform: scale(1.05);
                    z-index: 100;
                }
                
                .marker-content.highlight {
                    background: rgba(255, 215, 0, 0.15); /* Gold tint */
                    border-width: 2px;
                }

                .marker-title {
                    font-weight: 700;
                    font-size: 0.9rem;
                    margin-bottom: 4px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .marker-detail {
                    font-size: 0.75rem;
                    color: ${COLORS.accentPrimary};
                    font-weight: 600;
                    margin-top: 2px;
                    background: rgba(0,0,0,0.3);
                    padding: 2px 6px;
                    border-radius: 4px;
                    display: inline-block;
                }
                
                .marker-stem {
                    width: 2px;
                    height: 20px;
                    background: ${COLORS.accentPrimary};
                    margin: 0 auto;
                }
            `}</style>
        </div>
    );
};

export default MapboxGurgaonMap;
