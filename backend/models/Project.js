const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  slug: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['residential', 'commercial', 'plot'], required: true },
  status: { type: String, enum: ['ongoing', 'completed', 'upcoming', 'ready'], required: true },
  location: { type: String, required: true },
  city: { type: String, default: 'Chennai' },
  price: { type: String, required: true },
  pricePerSqft: { type: Number },
  bhkTypes: [{ type: String }],
  sizeRange: { type: String },
  totalUnits: { type: Number },
  landArea: { type: String },
  floors: { type: Number },
  heroImage: { type: String },
  images: {
    interior: [{ type: String }],
    exterior: [{ type: String }],
    siteProgress: [{ type: String }]
  },
  floorPlans: [{ type: String }],
  overview: [{ type: String }],        // bullet points
  amenities: [{ type: String }],
  specifications: [{
    category: String,
    points: [{ type: String }]
  }],
  nearbyPlaces: [{
    type: { type: String },
    name: String,
    distance: String
  }],
  faqs: [{ question: String, answer: String }],
  videoUrl: { type: String },
  mapEmbed: { type: String },
  brochureUrl: { type: String },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);
