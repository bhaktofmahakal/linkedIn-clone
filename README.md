# LinkedIn Clone - Mini Professional Networking Platform

A full-stack LinkedIn-like community platform built with modern web technologies. This project demonstrates user authentication, post creation, and profile management features.

## 🚀 Live Demo

- **Frontend**: [Deployed on Vercel](https://linked-in-clone-fawn.vercel.app/)
- **Backend**: [Deployed on Render](https://linkedin-clone-backend-ejyr.onrender.com/api)

## 🛠️ Tech Stack

| Technology | Purpose | Why Chosen |
|------------|---------|------------|
| **Next.js** | Frontend Framework | Fast setup, built-in routing, SSR/CSR flexibility, Vercel-ready |
| **Tailwind CSS** | Styling | Super quick for clean, responsive UI design |
| **Node.js + Express** | Backend API | Simple REST APIs, fast development cycle |
| **MongoDB Atlas** | Database | Free tier, cloud-hosted, great with Mongoose ORM |
| **JWT** | Authentication | Secure, stateless authentication |
| **Vercel** | Frontend Hosting | Optimized for Next.js, free tier |
| **Render** | Backend Hosting | Free Node.js hosting |

## ✨ Features

### Core Features (Assignment Requirements)
- ✅ **User Authentication**
  - Register/Login with email & password
  - JWT-based secure authentication
  - Protected routes and middleware

- ✅ **User Profiles**
  - Profile with name, email, bio
  - View any user's profile and their posts
  - Profile creation date and post count

- ✅ **Public Post Feed**
  - Create text-only posts (up to 1000 characters)
  - Home feed showing all posts
  - Display author name and timestamp
  - Real-time post creation

- ✅ **Profile Pages**
  - Dynamic routing `/profile/[id]`
  - View user's profile and all their posts
  - Own profile vs others' profile views

### Additional Features
- 🎨 **Responsive Design** - Works on all devices
- 🔄 **Real-time Updates** - Instant post creation and deletion
- 🗑️ **Post Management** - Delete your own posts
- 📱 **Mobile-First** - Optimized for mobile experience
- 🎯 **Loading States** - Smooth user experience with loading indicators
- 🚨 **Error Handling** - Comprehensive error handling and user feedback
- 🔍 **User Search** - Backend support for user discovery (ready for frontend)

## 📁 Project Structure

```
linkedin-clone/
├── client/                 # Next.js Frontend
│   ├── components/         # Reusable React components
│   │   ├── Navbar.js      # Navigation bar
│   │   ├── PostCard.js    # Individual post display
│   │   └── AuthForm.js    # Login/Register form
│   ├── pages/             # Next.js pages
│   │   ├── index.js       # Home feed
│   │   ├── login.js       # Login page
│   │   ├── register.js    # Registration page
│   │   └── profile/[id].js # Dynamic profile pages
│   ├── services/          # API integration
│   │   └── api.js         # Axios setup and API calls
│   └── styles/            # Global styles
│       └── globals.css    # Tailwind CSS + custom styles
│
├── server/                # Node.js Backend
│   ├── controllers/       # Business logic
│   │   ├── authController.js
│   │   ├── postController.js
│   │   └── userController.js
│   ├── middleware/        # Custom middleware
│   │   └── auth.js        # JWT authentication
│   ├── models/           # MongoDB schemas
│   │   ├── User.js       # User model
│   │   └── Post.js       # Post model
│   ├── routes/           # API routes
│   │   ├── auth.js       # Authentication routes
│   │   ├── posts.js      # Post management routes
│   │   └── users.js      # User profile routes
│   └── server.js         # Express server setup
│
└── README.md             # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/linkedin-clone.git
cd linkedin-clone
```

### 2. Backend Setup
```bash
cd server
npm install

# Create environment file
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Start the server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup
```bash
cd client
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:3000`

### 4. Environment Variables

#### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/linkedin-clone
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
CLIENT_URL=http://localhost:3000
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 📊 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |
| GET | `/api/posts` | Get all posts (feed) | No |
| POST | `/api/posts` | Create new post | Yes |
| GET | `/api/posts/user/:userId` | Get user's posts | No |
| DELETE | `/api/posts/:postId` | Delete post | Yes (own post) |
| GET | `/api/users/:userId` | Get user profile | No |
| PUT | `/api/users/profile` | Update profile | Yes |

## 🧪 Demo Users

For testing purposes, you can create accounts or use these demo credentials:

**Demo User 1:**
- Email: `john.doe@example.com`
- Password: `password123`
- Name: John Doe
- Bio: Full-stack developer passionate about creating amazing user experiences.

**Demo User 2:**
- Email: `jane.smith@example.com`
- Password: `password123`
- Name: Jane Smith
- Bio: UI/UX designer with 5+ years of experience in creating beautiful interfaces.

### Database (MongoDB Atlas)
1. Create free cluster on MongoDB Atlas
2. Create database user
3. Whitelist IP addresses
4. Get connection string
5. Update `MONGODB_URI` in environment variables

## 🔧 Development Scripts

### Backend
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
```

### Frontend
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
```

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Loading States**: Skeleton loaders and spinners for better UX
- **Error Handling**: Toast notifications for user feedback
- **Clean Interface**: LinkedIn-inspired professional design
- **Accessibility**: Semantic HTML and keyboard navigation support

## 🔒 Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured for specific origins
- **Error Handling**: No sensitive information leaked in errors

## 🚀 Future Enhancements

- [ ] Like/Unlike posts
- [ ] Comment system
- [ ] Real-time notifications
- [ ] Image upload for posts and profiles
- [ ] Connection/Follow system
- [ ] Advanced search and filters
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Dark mode toggle
- [ ] Infinite scroll pagination

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/bhaktofmahakal)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/utsav-mishra1)
- Email: utsavmishraa005@gmail.com

## 🙏 Acknowledgments

- Assignment provided by CIAAN Cyber Tech Pvt Ltd
- Inspired by LinkedIn's user interface and functionality
- Built with modern web development best practices

---

**Note**: This project was created as part of a Full Stack Development Internship assignment. It demonstrates proficiency in modern web technologies and full-stack development practices.
