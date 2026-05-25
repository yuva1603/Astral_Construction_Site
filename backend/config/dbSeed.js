const Project = require('../models/Project');
const User = require('../models/User');
const Blog = require('../models/Blog');

const mockProjects = [
  {
    slug: 'voora-one-sea',
    name: 'Voora One Sea',
    type: 'residential',
    status: 'ongoing',
    location: 'Kanathur, ECR, Chennai',
    city: 'Chennai',
    price: '7,199/sqft',
    pricePerSqft: 7199,
    bhkTypes: ['2 BHK', '3 BHK'],
    sizeRange: '1,112 – 1,584 sqft',
    totalUnits: 1039,
    landArea: '11.06 Acres',
    floors: 41,
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    images: {
      interior: [
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&w=800&q=80'
      ],
      exterior: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80'
      ],
      siteProgress: [
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
      ]
    },
    floorPlans: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80'
    ],
    overview: [
      'Tallest residential tower in East Coast Road (ECR) rising 41 floors high.',
      'Spectacular dual views of the deep blue Bay of Bengal and the serene Muttukadu backwaters.',
      'IGBC Pre-Certified Gold green development with over 1,000 native trees and a 1-acre natural pond.',
      'Exclusive 2.7-acre elevated podium with landscape architecture and a premium rooftop lounge.',
      'First project in Chennai offering 20-year structural warranty & 10-year fittings warranty.'
    ],
    amenities: [
      'Swimming Pool', 'Gym', 'Futsal Turf', 'CCTV', 'EV Charging',
      'Solar Energy', 'STP', 'Smart Home', 'Jogging Track', 'Meditation Pavilion',
      'Sky Amphitheatre', 'Grand Clubhouse', 'Natural Pond', 'Cricket Net', 'Yoga Pavilion'
    ],
    specifications: [
      {
        category: 'Structure',
        points: ['Seismic Zone III compliant RCC framed structure.', 'Solid block masonry walls with plastering.']
      },
      {
        category: 'Flooring',
        points: ['Premium double-charged vitrified tiles in living, dining, and bedrooms.', 'Anti-skid ceramic tiles in toilets and balconies.']
      },
      {
        category: 'Smart Tech',
        points: ['Main door with smart digital lock.', 'Home automation hubs for light and AC controls.']
      }
    ],
    nearbyPlaces: [
      { type: 'Transit', name: 'Sholinganallur Junction', distance: '10 mins' },
      { type: 'Education', name: 'AMET University', distance: '3 mins' },
      { type: 'Hospital', name: 'Chettinad Health City', distance: '15 mins' }
    ],
    faqs: [
      { question: 'What is the RERA number for Voora One Sea?', answer: 'Voora One Sea is fully RERA approved. Exact registration details can be found on our brochures.' },
      { question: 'What is the advantage of the ECR location?', answer: 'It offers direct access to the scenic coastline, extremely low noise pollution, and quick commutes to the OMR IT Corridor.' }
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.8453412586616!2d80.2458!3d12.8211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525b6!2sKanathur%20Reddikuppam!5e0!3m2!1sen!2sin!4v1620000000000',
    brochureUrl: '/brochures/one-sea.pdf',
    featured: true
  },
  {
    slug: 'voora-westside',
    name: 'Voora Westside',
    type: 'residential',
    status: 'ready',
    location: 'Ramapuram, Near DLF IT Park, Chennai',
    city: 'Chennai',
    price: '1.0 Cr Onwards',
    pricePerSqft: 7260,
    bhkTypes: ['2 BHK', '3 BHK'],
    sizeRange: '1,377 – 1,685 sqft',
    totalUnits: 110,
    landArea: '1.8 Acres',
    floors: 12,
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    images: {
      interior: [
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80'
      ],
      exterior: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
      ],
      siteProgress: []
    },
    floorPlans: [],
    overview: [
      'Located in the premium commercial and IT hub of Ramapuram, adjacent to DLF IT Park.',
      'Zero dead space floor layout configuration optimizing every single square inch.',
      'Unique keyless entry door modules and modern structural features with no shared common walls.',
      'Fully ready-to-occupy project with occupancy certificate already in place.'
    ],
    amenities: [
      'Swimming Pool', 'Gym', 'Futsal Turf', 'EV Charging', 'STP', 'CCTV', 'Kids Play Area'
    ],
    specifications: [
      {
        category: 'Structure',
        points: ['Premium RCC framed structural design.', 'Zero dead-space interior walls.']
      }
    ],
    nearbyPlaces: [
      { type: 'Workplace', name: 'DLF Cybercity IT Park', distance: '3 mins' },
      { type: 'Hospital', name: 'MIOT International', distance: '5 mins' }
    ],
    faqs: [],
    videoUrl: '',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.12!2d80.17!3d13.02!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52611e40000001%3A0x6291!2sRamapuram!5e0!3m2!1sen!2sin!4v1620000000001',
    brochureUrl: '',
    featured: true
  },
  {
    slug: 'voora-beckford',
    name: 'Voora Beckford',
    type: 'residential',
    status: 'ongoing',
    location: 'Nungambakkam, Chennai',
    city: 'Chennai',
    price: '3.5 Cr Onwards',
    pricePerSqft: 18500,
    bhkTypes: ['3 BHK', '4 BHK'],
    sizeRange: '2,200 – 3,400 sqft',
    totalUnits: 24,
    landArea: '0.8 Acres',
    floors: 8,
    heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    images: { interior: [], exterior: [], siteProgress: [] },
    floorPlans: [],
    overview: [
      'Extremely premium residential address in the heart of Nungambakkam.',
      'Limited collection of 24 ultra-luxury residences with exclusive private elevators.',
      'Double-height air-conditioned entrance lobby finished in imported Italian marble.'
    ],
    amenities: ['Gym', 'Smart Home', '24/7 Security', 'Grand Clubhouse', 'Concierge Service'],
    specifications: [],
    nearbyPlaces: [
      { type: 'Recreation', name: 'The Taj Coromandel', distance: '2 mins' }
    ],
    faqs: [],
    videoUrl: '',
    featured: true
  },
  {
    slug: 'voora-highway-haven',
    name: 'Voora Highway Haven',
    type: 'plot',
    status: 'ongoing',
    location: 'Panapakkam, NH-48, Kanchipuram',
    city: 'Kanchipuram',
    price: '₹1,500/sqft',
    pricePerSqft: 1500,
    bhkTypes: ['Plots'],
    sizeRange: '534 – 2,400 sqft',
    totalUnits: 220,
    landArea: '15 Acres',
    floors: 1,
    heroImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    images: { interior: [], exterior: [], siteProgress: [] },
    floorPlans: [],
    overview: [
      'Gated residential plotting development directly on the Chennai-Bangalore Industrial Corridor.',
      'Superbly situated just 10 mins from SIPCOT and 20 mins from the upcoming Greenfield International Airport.',
      'Immediate vicinity to major multi-billion investment facilities like TATA Motors EV Plant and Hong Fu.',
      'DTCP and RERA approved layouts with concrete internal roads, landscaped park and solar street lights.'
    ],
    amenities: ['CCTV', 'Solar Energy', 'STP', 'Jogging Track', 'Yoga Pavilion', 'Natural Park'],
    specifications: [],
    nearbyPlaces: [
      { type: 'Transit', name: 'Upcoming Greenfield Airport', distance: '20 mins' },
      { type: 'Industry', name: 'SIPCOT Industrial Hub', distance: '10 mins' }
    ],
    faqs: [],
    videoUrl: '',
    featured: true
  },
  {
    slug: 'voora-agastya',
    name: 'Voora Agastya',
    type: 'residential',
    status: 'ongoing',
    location: 'Tondiarpet, Chennai',
    city: 'Chennai',
    price: '2.3 Cr Onwards',
    pricePerSqft: 12500,
    bhkTypes: ['3 BHK', '4 BHK'],
    sizeRange: '1,850 – 2,800 sqft',
    totalUnits: 64,
    landArea: '1.2 Acres',
    floors: 14,
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    images: { interior: [], exterior: [], siteProgress: [] },
    floorPlans: [],
    overview: [
      'Spectacular sea-facing apartments in Tondiarpet.',
      'Wake up to the refreshing ocean breeze and golden vistas of the Bay of Bengal.',
      'Fitted with top-tier premium hardware fixtures and 10-year warranty options.'
    ],
    amenities: ['Swimming Pool', 'Gym', 'EV Charging', 'Smart Home', 'Sky Amphitheatre'],
    specifications: [],
    nearbyPlaces: [],
    faqs: [],
    videoUrl: '',
    featured: false
  },
  {
    slug: 'voora-vidyasagar-t-block',
    name: 'Voora Vidyasagar T-Block',
    type: 'residential',
    status: 'ongoing',
    location: 'Anna Nagar, Chennai',
    city: 'Chennai',
    price: '2.8 Cr Onwards',
    pricePerSqft: 15500,
    bhkTypes: ['3 BHK'],
    sizeRange: '1,500 – 1,950 sqft',
    totalUnits: 16,
    landArea: '0.4 Acres',
    floors: 5,
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    images: { interior: [], exterior: [], siteProgress: [] },
    floorPlans: [],
    overview: [
      'Exclusive boutique apartments located in Anna Nagar T-Block.',
      'Super premium neighborhood with excellent schools, hospitals and gourmet retail options in walking range.'
    ],
    amenities: ['CCTV', 'STP', 'Gym', 'Smart Home'],
    specifications: [],
    nearbyPlaces: [],
    faqs: [],
    videoUrl: '',
    featured: false
  },
  {
    slug: 'voora-oceans27',
    name: 'Voora Ocean\'s 27',
    type: 'residential',
    status: 'ongoing',
    location: 'Tondiarpet, Chennai',
    city: 'Chennai',
    price: '2.1 Cr Onwards',
    pricePerSqft: 11000,
    bhkTypes: ['2 BHK', '3 BHK'],
    sizeRange: '1,450 – 2,100 sqft',
    totalUnits: 72,
    landArea: '1.5 Acres',
    floors: 12,
    heroImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    images: { interior: [], exterior: [], siteProgress: [] },
    floorPlans: [],
    overview: [
      'Stunning high-rise development with panoramic views of the Chennai shorelines.',
      'Curated amenities for healthy multi-generational lifestyles.'
    ],
    amenities: ['Swimming Pool', 'Gym', 'Meditation Pavilion', 'Kids Play Area'],
    specifications: [],
    nearbyPlaces: [],
    faqs: [],
    videoUrl: '',
    featured: false
  },
  {
    slug: 'voora-tech-edge',
    name: 'Voora Tech Edge',
    type: 'commercial',
    status: 'ongoing',
    location: 'Guindy IT Hub, Chennai',
    city: 'Chennai',
    price: '12 Cr Onwards',
    pricePerSqft: 16000,
    bhkTypes: ['Office Spaces', 'Retail Outlets'],
    sizeRange: '5,000 – 45,000 sqft',
    totalUnits: 18,
    landArea: '2.1 Acres',
    floors: 10,
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    images: { interior: [], exterior: [], siteProgress: [] },
    floorPlans: [],
    overview: [
      'Grade-A corporate office complex in the central business hub of Guindy.',
      'Double-height air-conditioned ground lobby with advanced access cards control gateways.',
      'Sustainable building envelope with solar shading elements and smart glass installation.'
    ],
    amenities: ['CCTV', 'Solar Energy', 'STP', 'EV Charging', '24/7 Security'],
    specifications: [],
    nearbyPlaces: [
      { type: 'Transit', name: 'Guindy Metro Station', distance: '2 mins' }
    ],
    faqs: [],
    videoUrl: '',
    featured: true
  }
];

const mockBlogs = [
  {
    title: 'Voora Unveils ECR’s Tallest Architectural Marvel: One Sea',
    slug: 'voora-unveils-ecr-one-sea',
    summary: 'A detailed breakdown of how Voora’s 41-storey ultra-luxury project is redefining the oceanfront skyline of ECR, Kanathur.',
    content: 'Chennai’s premier luxury developer Voora has officially announced the launch of its crown jewel: Voora One Sea. Rising a monumental 41 storeys high, it stands as the tallest residential architectural landmark along the East Coast Road. Featuring spectacular panoramic dual views of the Bay of Bengal and the Muttukadu backwaters, the project is designed for the discerning elite. Beyond aesthetic luxury, Voora is introducing pioneering quality standards including an India-first 20-year structural warranty and a 10-year comprehensive warranty on fittings, backed by over 265 rigorous quality checkpoint evaluations prior to handover.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    category: 'Launch Announcement',
    author: 'Pavan Voora'
  },
  {
    title: 'Why Chennai’s Industrial Corridors are a Goldmine for Gated Plots',
    slug: 'chennai-industrial-corridors-gated-plots',
    summary: 'Analyzing the rapid appreciation of plotted properties in NH-48 (Kanchipuram) due to massive EV and manufacturing sector investments.',
    content: 'Plotted developments have emerged as the highest performing real estate asset class in post-pandemic Chennai. Specifically, the NH-48 Chennai-Bangalore Industrial Highway has witnessed record-breaking growth. With major automotive and technology majors establishing massive multi-billion production factories, areas like Panapakkam are experiencing rapid urbanization. The upcoming Greenfield International Airport in Parandur is acting as a major catalyst. Gated plots like Voora Highway Haven offer immediate appreciation potential, secured compound gates, and excellent internal network setups.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    category: 'Market Insights',
    author: 'Suman Voora'
  }
];

const seedDatabase = async () => {
  try {
    // 1. Seed Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      console.log('Seeding projects...');
      await Project.insertMany(mockProjects);
      console.log('Successfully seeded 8 primary Voora projects!');
    }

    // 2. Seed Blogs
    const blogCount = await Blog.countDocuments();
    if (blogCount === 0) {
      console.log('Seeding blog articles...');
      await Blog.insertMany(mockBlogs);
      console.log('Successfully seeded blog articles!');
    }

    // 3. Seed Admin User
    const adminUser = await User.findOne({ username: 'voora_admin' });
    if (!adminUser) {
      console.log('Creating default administrator account...');
      const admin = new User({
        username: 'voora_admin',
        password: 'VooraAdminPassword123!',
        role: 'admin'
      });
      await admin.save();
      console.log('Successfully created Admin Account: voora_admin / VooraAdminPassword123!');
    }
  } catch (error) {
    console.error(`Database seeding failed: ${error.message}`);
  }
};

module.exports = seedDatabase;
