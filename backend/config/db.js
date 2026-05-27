const mongoose = require('mongoose');

const connectDB = async () => {
  const atlasUri = process.env.MONGO_URI;
  const localUri = 'mongodb://127.0.0.1:27017/voora';

  try {
    console.log('⚡ Attempting to connect to MongoDB Atlas...');
    const conn = await mongoose.connect(atlasUri, { serverSelectionTimeoutMS: 4000 });
    console.log(`✅ MongoDB Connected (Atlas): ${conn.connection.host}`);
    
    // Auto-seed database with projects, blogs, and admin user
    const seedDatabase = require('./dbSeed');
    await seedDatabase();
  } catch (atlasError) {
    console.warn(`\n⚠️  MongoDB Atlas Connection Failed: ${atlasError.message}`);
    console.warn(`👉 Quick Diagnosis: Your current network IP address is likely not whitelisted in your MongoDB Atlas Access console.`);
    
    try {
      console.log('\n🔄 Attempting automatic local fallback connection to MongoDB (127.0.0.1:27017)...');
      const conn = await mongoose.connect(localUri, { serverSelectionTimeoutMS: 3000 });
      console.log(`✅ MongoDB Connected (Local Fallback): ${conn.connection.host}`);
      
      const seedDatabase = require('./dbSeed');
      await seedDatabase();
    } catch (localError) {
      console.error('\n❌ Fatal: Could not connect to MongoDB Atlas OR Local MongoDB.');
      console.error(`  - Atlas Error: ${atlasError.message}`);
      console.error(`  - Local Error: ${localError.message}`);
      console.error('\n💡 To fix this, please complete one of the following:');
      console.error('  👉 Option A: Log in to cloud.mongodb.com -> Network Access -> Add IP Address -> click "Allow Access from Anywhere" or "Add Current IP", wait 1 min, and restart.');
      console.error('  👉 Option B: Open and start your local MongoDB database service (e.g. MongoDB Compass / mongod), then restart.');
      process.exit(1);
    }
  }
};

module.exports = connectDB;

