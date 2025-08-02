// Demo Account Creation Script
// Run this after deployment to create demo accounts

const axios = require('axios');

// Update this with your deployed backend URL
const API_URL = 'https://your-backend-url.onrender.com/api';

const demoUsers = [
  {
    name: 'Demo User',
    email: 'demo@linkedin-clone.com',
    password: 'demo123456',
    bio: 'This is a demo account for testing the LinkedIn clone application. Feel free to explore all features!'
  },
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    bio: 'Full-stack developer passionate about creating amazing user experiences. Love working with React, Node.js, and MongoDB.'
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    password: 'password123',
    bio: 'UI/UX designer with 5+ years of experience in creating beautiful and intuitive interfaces. Always learning new design trends.'
  }
];

const demoPosts = [
  {
    content: "Just launched my new LinkedIn clone project! Excited to share it with the community. Built with Next.js, Node.js, and MongoDB. 🚀 #webdev #react #nodejs",
    userEmail: 'demo@linkedin-clone.com'
  },
  {
    content: "Working on improving my full-stack development skills. Any recommendations for advanced React patterns and Node.js best practices? 💻",
    userEmail: 'john.doe@example.com'
  },
  {
    content: "Great day at the office! Collaborated with an amazing team on a new feature. Teamwork makes the dream work! ✨ #teamwork #design",
    userEmail: 'jane.smith@example.com'
  },
  {
    content: "Learning about MongoDB aggregation pipelines today. The power of NoSQL databases never ceases to amaze me! 📊 #mongodb #database",
    userEmail: 'demo@linkedin-clone.com'
  },
  {
    content: "Just finished reading about the latest React 18 features. Concurrent rendering is going to be a game-changer! 🎯 #react #javascript",
    userEmail: 'john.doe@example.com'
  }
];

async function createDemoAccounts() {
  console.log('Creating demo accounts...');
  
  const createdUsers = {};
  
  // Create users
  for (const user of demoUsers) {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, user);
      console.log(`✅ Created user: ${user.name} (${user.email})`);
      createdUsers[user.email] = response.data.token;
    } catch (error) {
      if (error.response?.data?.message?.includes('already exists')) {
        console.log(`⚠️  User already exists: ${user.email}`);
        // Try to login to get token
        try {
          const loginResponse = await axios.post(`${API_URL}/auth/login`, {
            email: user.email,
            password: user.password
          });
          createdUsers[user.email] = loginResponse.data.token;
        } catch (loginError) {
          console.log(`❌ Could not login user: ${user.email}`);
        }
      } else {
        console.log(`❌ Error creating user ${user.email}:`, error.response?.data?.message || error.message);
      }
    }
  }
  
  // Create posts
  console.log('\nCreating demo posts...');
  for (const post of demoPosts) {
    const token = createdUsers[post.userEmail];
    if (token) {
      try {
        await axios.post(`${API_URL}/posts`, 
          { content: post.content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(`✅ Created post by ${post.userEmail}`);
      } catch (error) {
        console.log(`❌ Error creating post:`, error.response?.data?.message || error.message);
      }
    }
  }
  
  console.log('\n🎉 Demo accounts and posts created successfully!');
  console.log('\n📋 Demo Credentials:');
  console.log('Email: demo@linkedin-clone.com');
  console.log('Password: demo123456');
  console.log('\nOther test accounts:');
  console.log('Email: john.doe@example.com | Password: password123');
  console.log('Email: jane.smith@example.com | Password: password123');
}

// Run the script
createDemoAccounts().catch(console.error);