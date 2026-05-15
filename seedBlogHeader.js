const mongoose = require('mongoose');
require('dotenv').config();
const BlogHeader = require('./models/BlogHeader');

const seedBlogHeader = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const siteId = 'ParekhChamberofTextile01';
    
    const existing = await BlogHeader.findOne({ siteId });
    if (existing) {
      console.log('BlogHeader already exists for', siteId);
    } else {
      await BlogHeader.create({
        siteId,
        title: 'BLOG & ARTICLE',
        description: '“Join and participate in our nation-wide campaign to digitalize the Textile Sector, one of the largest sectors of India”.',
        authorName: 'HC PAREKH',
        authorRole: 'Textile Manufacturer & Entrepreneur',
        country: 'INDIA'
      });
      console.log('BlogHeader seeded for', siteId);
    }

    mongoose.connection.close();
  } catch (error) {
    console.error('Seeding error:', error);
  }
};

seedBlogHeader();
