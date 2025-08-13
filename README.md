# 🎓 EduHub - Modern Learning Platform

A full-stack web application built with Node.js, Express, MongoDB, and modern frontend technologies. EduHub provides a comprehensive learning management system with user authentication, course management, and interactive features.

## ✨ Features

### 🎯 Core Functionality
- **User Authentication**: Secure login/signup system with JWT tokens
- **Course Management**: Browse, view details, and enroll in courses
- **Instructor Profiles**: View instructor information and social media links
- **Student Testimonials**: Read success stories from course graduates
- **Contact System**: Contact form for inquiries and support
- **Newsletter Subscription**: Stay updated with latest courses and offers

### 🎨 Frontend Features
- **Responsive Design**: Mobile-first approach with Bootstrap 5
- **Interactive UI**: Smooth animations with AOS (Animate On Scroll)
- **Data Tables**: Advanced course listing with search and pagination
- **Modal System**: Course details, login, and signup modals
- **Social Integration**: Functional social media links and sharing

### 🔧 Backend Features
- **RESTful API**: Complete CRUD operations for all entities
- **Database Integration**: MongoDB with Mongoose ODM
- **Authentication Middleware**: JWT-based route protection
- **Input Validation**: Form validation and sanitization
- **Error Handling**: Comprehensive error management

## 🚀 Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom styling with CSS variables
- **Bootstrap 5** - Responsive framework
- **JavaScript (ES6+)** - Modern JavaScript features
- **jQuery** - DOM manipulation and DataTables
- **AOS** - Animate On Scroll library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - Object Data Modeling
- **JWT** - JSON Web Token authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-Origin Resource Sharing

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn** package manager

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/eduhub.git
cd eduhub
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Environment Configuration
Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/eduhub
JWT_SECRET=your_super_secret_jwt_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
NODE_ENV=development
```

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
```

### 5. Start the Backend Server
```bash
npm run dev
```

The backend will be available at `http://localhost:5000`

### 6. Open Frontend
Open `Frontend/bootstrap.html` in your web browser or serve it using a local server.

## 📚 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get specific course
- `POST /api/courses` - Create new course (protected)
- `PUT /api/courses/:id` - Update course (protected)
- `DELETE /api/courses/:id` - Delete course (protected)
- `POST /api/courses/:id/enroll` - Enroll in course (protected)
- `POST /api/courses/:id/rate` - Rate course (protected)

### Instructors
- `GET /api/instructors` - Get all instructors
- `GET /api/instructors/:id` - Get specific instructor
- `GET /api/instructors/:id/courses` - Get instructor's courses
- `POST /api/instructors` - Create instructor (protected)
- `PUT /api/instructors/:id` - Update instructor (protected)
- `DELETE /api/instructors/:id` - Delete instructor (protected)

### Testimonials
- `GET /api/testimonials` - Get approved testimonials
- `GET /api/testimonials/:id` - Get specific testimonial
- `POST /api/testimonials` - Create testimonial (protected)
- `PUT /api/testimonials/:id` - Update testimonial (protected)
- `DELETE /api/testimonials/:id` - Delete testimonial (protected)
- `PATCH /api/testimonials/:id/approve` - Approve testimonial (protected)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact submissions (protected)
- `GET /api/contact/:id` - Get specific contact submission (protected)
- `PATCH /api/contact/:id/status` - Update contact status (protected)
- `DELETE /api/contact/:id` - Delete contact submission (protected)

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `POST /api/newsletter/unsubscribe` - Unsubscribe from newsletter
- `GET /api/newsletter/subscribers` - Get all subscribers (protected)
- `GET /api/newsletter/status/:email` - Check subscription status
- `DELETE /api/newsletter/:email` - Remove subscriber (protected)

## 🔐 Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## 📁 Project Structure

```
eduhub/
├── backend/
│   ├── models/          # Database schemas
│   ├── routes/          # API route handlers
│   ├── middleware/      # Custom middleware
│   ├── app.js          # Main server file
│   ├── package.json    # Dependencies
│   └── .env           # Environment variables
├── Frontend/
│   └── bootstrap.html  # Main frontend file
├── .gitignore          # Git ignore rules
└── README.md           # Project documentation
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
Open the HTML file in a browser and test:
- User registration and login
- Course browsing and details
- Contact form submission
- Newsletter subscription
- Social media links

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Use PM2 or similar process manager
3. Set up MongoDB Atlas or production MongoDB
4. Configure CORS for production domain

### Frontend Deployment
1. Host static files on CDN or web server
2. Update API_BASE_URL to production backend
3. Ensure HTTPS for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/eduhub/issues) page
2. Create a new issue with detailed description
3. Contact the development team

## 🙏 Acknowledgments

- Bootstrap team for the amazing CSS framework
- MongoDB team for the excellent database
- Express.js community for the robust web framework
- All contributors who helped improve this project

---

**Happy Learning! 🎓✨**
