
export interface Project {
    id: string;
    name: string;
    regionId: string; // To link with gurgaonSectors
    lng: number;
    lat: number;
    priceRange: string;
    configuration: string;
    status: 'New Launch' | 'Under Construction' | 'Ready to Move';
    images: string[]; // URLs for the hover popup
}

export interface ProjectMarker {
    id: string;
    name: string;
    details?: string[]; // e.g., ["Price: 45K-50K", "29 Acres"]
    logo?: string; // Placeholder for now
    coordinates: [number, number]; // [lng, lat]
    type: 'residential' | 'commercial' | 'hotel' | 'sez';
    highlight?: boolean;
}

// Full projects data for Region Details
export const projects: Project[] = [
    {
        id: 'p1',
        name: 'DLF The Arbour',
        regionId: 'sector-63',
        lng: 77.0650,
        lat: 28.4050,
        priceRange: '₹4.5 Cr - ₹9 Cr',
        configuration: '4 BHK Ultra Luxury',
        status: 'New Launch',
        images: ['https://picsum.photos/400/300?random=1', 'https://picsum.photos/400/300?random=2', 'https://picsum.photos/400/300?random=3']
    },
    {
        id: 'p2',
        name: 'Oberoi Realty',
        regionId: 'sector-58',
        lng: 77.0720,
        lat: 28.4040,
        priceRange: '₹45K - ₹50K / sq.ft',
        configuration: '3/4 BHK Luxury',
        status: 'New Launch',
        images: ['https://picsum.photos/400/300?random=4', 'https://picsum.photos/400/300?random=5']
    },
    {
        id: 'p3',
        name: 'Grand Hyatt',
        regionId: 'sector-58',
        lng: 77.0680,
        lat: 28.4060,
        priceRange: 'On Request',
        configuration: 'Hotel & Residences',
        status: 'Under Construction',
        images: ['https://picsum.photos/400/300?random=6', 'https://picsum.photos/400/300?random=7']
    },
    {
        id: 'p4',
        name: 'M3M Mansion',
        regionId: 'sector-59',
        lng: 77.0750,
        lat: 28.4030,
        priceRange: '₹5 Cr - ₹12 Cr',
        configuration: 'Golf Facing 4 BHK',
        status: 'Under Construction',
        images: ['https://picsum.photos/400/300?random=8', 'https://picsum.photos/400/300?random=9']
    },
    {
        id: 'p5',
        name: 'Hines Elevate',
        regionId: 'sector-59',
        lng: 77.0680,
        lat: 28.3990,
        priceRange: '₹3 Cr - ₹5 Cr',
        configuration: '3/4 BHK Premium',
        status: 'Ready to Move',
        images: ['https://picsum.photos/400/300?random=10', 'https://picsum.photos/400/300?random=11']
    },
    {
        id: 'p6',
        name: 'Max Estates',
        regionId: 'sector-59',
        lng: 77.0700,
        lat: 28.3995,
        priceRange: '₹40K / sq.ft',
        configuration: 'Boutique Luxury',
        status: 'New Launch',
        images: ['https://picsum.photos/400/300?random=12', 'https://picsum.photos/400/300?random=13']
    },
    {
        id: 'p7',
        name: 'Mahindra Luminare',
        regionId: 'sector-59',
        lng: 77.0730,
        lat: 28.3990,
        priceRange: '₹4 Cr ++',
        configuration: 'Wraparound Decks',
        status: 'Ready to Move',
        images: ['https://picsum.photos/400/300?random=14', 'https://picsum.photos/400/300?random=15']
    },
    {
        id: 'p8',
        name: 'Sobha Realty',
        regionId: 'sector-61',
        lng: 77.0670,
        lat: 28.3970,
        priceRange: '₹25K ++',
        configuration: 'Integrated Township',
        status: 'New Launch',
        images: ['https://picsum.photos/400/300?random=16', 'https://picsum.photos/400/300?random=17']
    },
    {
        id: 'p9',
        name: 'Silverglades Legacy',
        regionId: 'sector-61',
        lng: 77.0730,
        lat: 28.3960,
        priceRange: '₹3.5 Cr ++',
        configuration: 'High Rise',
        status: 'Under Construction',
        images: ['https://picsum.photos/400/300?random=18', 'https://picsum.photos/400/300?random=19']
    },
    {
        id: 'p10',
        name: 'Google / IBM SEZ',
        regionId: 'sector-59',
        lng: 77.0780,
        lat: 28.3980,
        priceRange: 'Lease Only',
        configuration: 'Office Spaces',
        status: 'Ready to Move',
        images: ['https://picsum.photos/400/300?random=20', 'https://picsum.photos/400/300?random=21']
    }
];

// Approximated locations around Golf Course Extn / Sector 58-59
// Center reference: 28.4021, 77.0697
export const premiumProjects: ProjectMarker[] = [
    {
        id: 'dlf-luxury',
        name: 'DLF',
        details: ['EXPECTED PRICE:', '45K - 50K PER SQ.FT', '< 29 ACRES'],
        coordinates: [77.0650, 28.4050],
        type: 'residential',
        highlight: true
    },
    {
        id: 'oberoi-realty',
        name: 'OBEROI REALTY',
        details: ['EXPECTED PRICE:', '45K - 50K PER SQ.FT', '< 15 ACRES'],
        coordinates: [77.0720, 28.4040],
        type: 'residential',
        highlight: true
    },
    {
        id: 'grand-hyatt',
        name: 'GRAND HYATT',
        coordinates: [77.0680, 28.4060],
        type: 'hotel'
    },
    {
        id: 'm3m-aravalli',
        name: 'M3M',
        details: ['FACING ARAVALLI', 'DIRECTLY'],
        coordinates: [77.0750, 28.4030],
        type: 'residential',
        highlight: true
    },
    {
        id: 'hines-elevate',
        name: 'HINES ELEVATE',
        coordinates: [77.0680, 28.3990],
        type: 'residential'
    },
    {
        id: 'max-estates',
        name: 'MAX ESTATES',
        details: ['< 7 ACRES'],
        coordinates: [77.0700, 28.3995],
        type: 'residential'
    },
    {
        id: 'mahindra-luminare',
        name: 'MAHINDRA LUMINARE',
        coordinates: [77.0730, 28.3990],
        type: 'residential'
    },
    {
        id: 'sobha-realty',
        name: 'SOBHA REALTY',
        details: ['EXPECTED PRICE:', '25K ++'],
        coordinates: [77.0670, 28.3970],
        type: 'residential',
        highlight: true
    },
    {
        id: 'silverglades-legacy',
        name: 'SILVERGLADES LEGACY',
        coordinates: [77.0730, 28.3960],
        type: 'residential'
    },
    {
        id: 'it-sez',
        name: 'IT SEZ',
        details: ['IBM', 'Google'],
        coordinates: [77.0780, 28.3980],
        type: 'sez'
    }
];
