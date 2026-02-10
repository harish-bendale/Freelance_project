export interface Region {
    id: string;
    name: string;
    center: [number, number];
    zoom: number;
    polygon: [number, number][]; // Array of lat-lng points
}

export const regions: Region[] = [
    {
        id: 'dwarka-expressway',
        name: 'Dwarka Expressway',
        center: [28.4721, 76.9634],
        zoom: 13,
        polygon: [
            [28.4850, 76.9400],
            [28.5100, 76.9800],
            [28.5000, 77.0200],
            [28.4600, 76.9900],
            [28.4500, 76.9500]
        ]
    },
    {
        id: 'cyber-hub-sector-24',
        name: 'Cyber Hub & Sector 24',
        center: [28.4951, 77.0878],
        zoom: 15,
        polygon: [
            [28.5050, 77.0800],
            [28.5050, 77.1000],
            [28.4850, 77.1000],
            [28.4850, 77.0800]
        ]
    },
    {
        id: 'golf-course-road',
        name: 'Golf Course Road (Sectors 42-56)',
        center: [28.4416, 77.0984],
        zoom: 14,
        polygon: [
            [28.4600, 77.0900],
            [28.4700, 77.1100],
            [28.4200, 77.1200],
            [28.4100, 77.1000]
        ]
    },
    {
        id: 'sohna-road',
        name: 'Sohna Road (Sectors 47-50)',
        center: [28.4013, 77.0422],
        zoom: 14,
        polygon: [
            [28.4200, 77.0300],
            [28.4200, 77.0600],
            [28.3800, 77.0600],
            [28.3800, 77.0300]
        ]
    },
    {
        id: 'mg-road-sector-14',
        name: 'MG Road & Sector 14',
        center: [28.4750, 77.0450],
        zoom: 14,
        polygon: [
            [28.4850, 77.0300],
            [28.4850, 77.0600],
            [28.4650, 77.0600],
            [28.4650, 77.0300]
        ]
    }
];
