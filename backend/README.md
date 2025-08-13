# EduHub Backend API

A comprehensive backend API for the EduHub learning platform built with Node.js, Express, and MongoDB.

## 🚀 Features

- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **Course Management**: Full CRUD operations for courses with enrollment system
- **Instructor Management**: Instructor profiles and course associations
- **Testimonials**: Student feedback system with approval workflow
- **Contact Management**: Contact form handling and management
- **Newsletter**: Subscription management system
- **RESTful API**: Clean, consistent API endpoints
- **Data Validation**: Input validation and error handling
- **MongoDB Integration**: Mongoose ODM with proper schemas

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository and navigate to backend:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file (.env):**
   ```bash
   # Create .env file in backend directory
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/eduhub
   JWT_SECRET=your_super_secret_jwt_key_here
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   NODE_ENV=development
   ```

4. **Start MongoDB:**
   - Local: `mongod`
   - Cloud: Use MongoDB Atlas or similar service

5. **Run the application:**
   ```bash
   # Development mode (with nodemon)
   npm run dev
   
   # Production mode
   npm start
   ```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create course (protected)
- `PUT /api/courses/:id` - Update course (protected)
- `DELETE /api/courses/:id` - Delete course (protected)
- `POST /api/courses/:id/enroll` - Enroll in course (protected)
- `POST /api/courses/:id/rate` - Rate course (protected)

### Instructors
- `GET /api/instructors` - Get all instructors
- `GET /api/instructors/:id` - Get single instructor
- `POST /api/instructors` - Create instructor (protected)
- `PUT /api/instructors/:id` - Update instructor (protected)
- `DELETE /api/instructors/:id` - Delete instructor (protected)
- `GET /api/instructors/:id/courses` - Get instructor courses

### Testimonials
- `GET /api/testimonials` - Get approved testimonials
- `GET /api/testimonials/:id` - Get single testimonial
- `POST /api/testimonials` - Create testimonial (protected)
- `PUT /api/testimonials/:id` - Update testimonial (protected)
- `DELETE /api/testimonials/:id` - Delete testimonial (protected)
- `PATCH /api/testimonials/:id/approve` - Approve testimonial (protected)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact submissions
- `GET /api/contact/:id` - Get single contact submission
- `PATCH /api/contact/:id/status` - Update contact status
- `DELETE /api/contact/:id` - Delete contact submission

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `POST /api/newsletter/unsubscribe` - Unsubscribe from newsletter
- `GET /api/newsletter/subscribers` - Get all subscribers
- `GET /api/newsletter/status/:email` - Check subscription status
- `DELETE /api/newsletter/:id` - Delete subscription

## 🔐 Authentication

Protected routes require a valid JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## 📊 Database Models

- **User**: Student accounts with role-based access
- **Course**: Course information with enrollment tracking
- **Instructor**: Instructor profiles and course associations
- **Testimonial**: Student feedback and ratings
- **Contact**: Contact form submissions
- **Newsletter**: Email subscription management

## 🚨 Error Handling

The API includes comprehensive error handling:
- Input validation
- Database error handling
- JWT token validation
- HTTP status codes
- Descriptive error messages

## 🔧 Development

- **Hot Reload**: Use `npm run dev` for development with nodemon
- **Environment Variables**: Configure via `.env` file
- **Logging**: Console logging for debugging
- **CORS**: Enabled for frontend integration

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `MONGO_URI` | MongoDB connection string | - |
| `JWT_SECRET` | JWT signing secret | - |
| `EMAIL_USER` | Email service username | - |
| `EMAIL_PASS` | Email service password | - |
| `NODE_ENV` | Environment mode | development |

## 🚀 Deployment

1. Set `NODE_ENV=production`
2. Configure production MongoDB URI
3. Set strong JWT secret
4. Use PM2 or similar process manager
5. Configure reverse proxy (nginx)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For support, email support@eduhub.com or create an issue in the repository. 