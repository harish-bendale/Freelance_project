// Realistic Gurgaon Sector Boundaries
// Based on actual Gurgaon sector layout and geography
// Sectors are organized by major zones

export interface SectorBoundary {
    id: string;
    name: string;
    sectorNumber?: string;
    zone: string;
    center: [number, number];
    zoom: number;
    polygon: [number, number][];
}

// Major sectors with realistic boundaries
export const gurgaonSectors: SectorBoundary[] = [
    // OLD GURGAON - Sectors 1-57
    {
        id: 'sector-14',
        name: 'Sector 14',
        sectorNumber: '14',
        zone: 'Old Gurgaon',
        center: [28.4750, 77.0450],
        zoom: 15,
        polygon: [
            [28.4800, 77.0400],
            [28.4800, 77.0500],
            [28.4700, 77.0500],
            [28.4700, 77.0400]
        ]
    },
    {
        id: 'sector-29',
        name: 'Sector 29',
        sectorNumber: '29',
        zone: 'Old Gurgaon',
        center: [28.4620, 77.0650],
        zoom: 15,
        polygon: [
            [28.4670, 77.0600],
            [28.4670, 77.0700],
            [28.4570, 77.0700],
            [28.4570, 77.0600]
        ]
    },
    {
        id: 'sector-43',
        name: 'Sector 43',
        sectorNumber: '43',
        zone: 'Old Gurgaon',
        center: [28.4480, 77.0900],
        zoom: 15,
        polygon: [
            [28.4530, 77.0850],
            [28.4530, 77.0950],
            [28.4430, 77.0950],
            [28.4430, 77.0850]
        ]
    },
    {
        id: 'sector-56',
        name: 'Sector 56',
        sectorNumber: '56',
        zone: 'Golf Course Road',
        center: [28.4200, 77.1050],
        zoom: 15,
        polygon: [
            [28.4250, 77.1000],
            [28.4250, 77.1100],
            [28.4150, 77.1100],
            [28.4150, 77.1000]
        ]
    },

    // GOLF COURSE EXTENSION - Sectors 58-67
    {
        id: 'sector-58',
        name: 'Sector 58',
        sectorNumber: '58',
        zone: 'Golf Course Extension',
        center: [28.4050, 77.0650],
        zoom: 15,
        polygon: [
            [28.4100, 77.0600],
            [28.4100, 77.0700],
            [28.4000, 77.0700],
            [28.4000, 77.0600]
        ]
    },
    {
        id: 'sector-59',
        name: 'Sector 59',
        sectorNumber: '59',
        zone: 'Golf Course Extension',
        center: [28.4000, 77.0700],
        zoom: 15,
        polygon: [
            [28.4050, 77.0650],
            [28.4050, 77.0750],
            [28.3950, 77.0750],
            [28.3950, 77.0650]
        ]
    },
    {
        id: 'sector-61',
        name: 'Sector 61',
        sectorNumber: '61',
        zone: 'Golf Course Extension',
        center: [28.3900, 77.0800],
        zoom: 15,
        polygon: [
            [28.3950, 77.0750],
            [28.3950, 77.0850],
            [28.3850, 77.0850],
            [28.3850, 77.0750]
        ]
    },
    {
        id: 'sector-63',
        name: 'Sector 63',
        sectorNumber: '63',
        zone: 'Golf Course Extension',
        center: [28.3950, 77.0600],
        zoom: 15,
        polygon: [
            [28.4000, 77.0550],
            [28.4000, 77.0650],
            [28.3900, 77.0650],
            [28.3900, 77.0550]
        ]
    },
    {
        id: 'sector-65',
        name: 'Sector 65',
        sectorNumber: '65',
        zone: 'Golf Course Extension',
        center: [28.4000, 77.0500],
        zoom: 15,
        polygon: [
            [28.4050, 77.0450],
            [28.4050, 77.0550],
            [28.3950, 77.0550],
            [28.3950, 77.0450]
        ]
    },

    // NEW GURGAON - Sectors 58-115
    {
        id: 'sector-82',
        name: 'Sector 82',
        sectorNumber: '82',
        zone: 'New Gurgaon',
        center: [28.3950, 76.9650],
        zoom: 15,
        polygon: [
            [28.4000, 76.9600],
            [28.4000, 76.9700],
            [28.3900, 76.9700],
            [28.3900, 76.9600]
        ]
    },
    {
        id: 'sector-83',
        name: 'Sector 83',
        sectorNumber: '83',
        zone: 'New Gurgaon',
        center: [28.3850, 76.9750],
        zoom: 15,
        polygon: [
            [28.3900, 76.9700],
            [28.3900, 76.9800],
            [28.3800, 76.9800],
            [28.3800, 76.9700]
        ]
    },
    {
        id: 'sector-84',
        name: 'Sector 84',
        sectorNumber: '84',
        zone: 'New Gurgaon',
        center: [28.3750, 76.9850],
        zoom: 15,
        polygon: [
            [28.3800, 76.9800],
            [28.3800, 76.9900],
            [28.3700, 76.9900],
            [28.3700, 76.9800]
        ]
    },

    // DWARKA EXPRESSWAY SECTORS
    {
        id: 'sector-102',
        name: 'Sector 102',
        sectorNumber: '102',
        zone: 'Dwarka Expressway',
        center: [28.4100, 76.9700],
        zoom: 15,
        polygon: [
            [28.4150, 76.9650],
            [28.4150, 76.9750],
            [28.4050, 76.9750],
            [28.4050, 76.9650]
        ]
    },
    {
        id: 'sector-103',
        name: 'Sector 103',
        sectorNumber: '103',
        zone: 'Dwarka Expressway',
        center: [28.4200, 76.9600],
        zoom: 15,
        polygon: [
            [28.4250, 76.9550],
            [28.4250, 76.9650],
            [28.4150, 76.9650],
            [28.4150, 76.9550]
        ]
    },
    {
        id: 'sector-104',
        name: 'Sector 104',
        sectorNumber: '104',
        zone: 'Dwarka Expressway',
        center: [28.4300, 76.9500],
        zoom: 15,
        polygon: [
            [28.4350, 76.9450],
            [28.4350, 76.9550],
            [28.4250, 76.9550],
            [28.4250, 76.9450]
        ]
    },
    {
        id: 'sector-109',
        name: 'Sector 109',
        sectorNumber: '109',
        zone: 'Dwarka Expressway',
        center: [28.4500, 76.9400],
        zoom: 15,
        polygon: [
            [28.4550, 76.9350],
            [28.4550, 76.9450],
            [28.4450, 76.9450],
            [28.4450, 76.9350]
        ]
    },

    // SOHNA ROAD SECTORS
    {
        id: 'sector-47',
        name: 'Sector 47',
        sectorNumber: '47',
        zone: 'Sohna Road',
        center: [28.4100, 77.0350],
        zoom: 15,
        polygon: [
            [28.4150, 77.0300],
            [28.4150, 77.0400],
            [28.4050, 77.0400],
            [28.4050, 77.0300]
        ]
    },
    {
        id: 'sector-48',
        name: 'Sector 48',
        sectorNumber: '48',
        zone: 'Sohna Road',
        center: [28.4000, 77.0450],
        zoom: 15,
        polygon: [
            [28.4050, 77.0400],
            [28.4050, 77.0500],
            [28.3950, 77.0500],
            [28.3950, 77.0400]
        ]
    },
    {
        id: 'sector-49',
        name: 'Sector 49',
        sectorNumber: '49',
        zone: 'Sohna Road',
        center: [28.3900, 77.0350],
        zoom: 15,
        polygon: [
            [28.3950, 77.0300],
            [28.3950, 77.0400],
            [28.3850, 77.0400],
            [28.3850, 77.0300]
        ]
    },

    // CYBER CITY / DLF PHASE SECTORS
    {
        id: 'sector-24',
        name: 'Sector 24 (Cyber Hub)',
        sectorNumber: '24',
        zone: 'Cyber City',
        center: [28.4951, 77.0878],
        zoom: 15,
        polygon: [
            [28.5000, 77.0830],
            [28.5000, 77.0930],
            [28.4900, 77.0930],
            [28.4900, 77.0830]
        ]
    },
    {
        id: 'sector-25',
        name: 'Sector 25',
        sectorNumber: '25',
        zone: 'Cyber City',
        center: [28.4850, 77.0950],
        zoom: 15,
        polygon: [
            [28.4900, 77.0900],
            [28.4900, 77.1000],
            [28.4800, 77.1000],
            [28.4800, 77.0900]
        ]
    },
    {
        id: 'sector-26',
        name: 'Sector 26',
        sectorNumber: '26',
        zone: 'Cyber City',
        center: [28.4750, 77.1050],
        zoom: 15,
        polygon: [
            [28.4800, 77.1000],
            [28.4800, 77.1100],
            [28.4700, 77.1100],
            [28.4700, 77.1000]
        ]
    }
];

// Group sectors by zone for easier filtering
export const sectorsByZone = {
    'Old Gurgaon': gurgaonSectors.filter(s => s.zone === 'Old Gurgaon'),
    'New Gurgaon': gurgaonSectors.filter(s => s.zone === 'New Gurgaon'),
    'Dwarka Expressway': gurgaonSectors.filter(s => s.zone === 'Dwarka Expressway'),
    'Sohna Road': gurgaonSectors.filter(s => s.zone === 'Sohna Road'),
    'Cyber City': gurgaonSectors.filter(s => s.zone === 'Cyber City'),
    'Golf Course Road': gurgaonSectors.filter(s => s.zone === 'Golf Course Road')
};
