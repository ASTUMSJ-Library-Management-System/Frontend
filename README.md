# Library Management System - Frontend Setup

## 🚀 Project Overview
A modern React-based Library Management System with role-based access (Admin/Student) for managing books, users, borrowing, and payments.

## 🛠 Tech Stack
- **React 18** + **Vite** (Fast development)
- **TailwindCSS** + **shadcn/ui** (Modern UI components)
- **React Router DOM** (Navigation)
- **React Hook Form** (Form management)
- **Axios** (API calls)
- **Lucide React** (Icons)

## 📁 Project Structure & Team Assignments

### `src/pages/auth/` - Authentication Pages
**What to build:**
- `LoginPage.jsx` - User login form
- `RegisterPage.jsx` - User registration form
- `ForgotPasswordPage.jsx` - Password recovery

**Features needed:**
- Email/password authentication
- Role selection (Admin/Student)
- Form validation with React Hook Form
- Error handling and success messages

### `src/pages/admin/` - Admin Dashboard Pages
**What to build:**
- `DashboardPage.jsx` - Main admin dashboard with stats
- `BookManagementPage.jsx` - Add/Edit/Delete books
- `UserManagementPage.jsx` - View/manage all users
- `PaymentVerificationPage.jsx` - Approve/reject payments
- `BorrowingHistoryPage.jsx` - View all borrowing records

**Features needed:**
- Book CRUD operations (title, author, ISBN, category, copies)
- User management with borrowing history
- Payment approval workflow
- Statistics dashboard (total books, users, borrowed books, pending payments)

### `src/pages/student/` - Student Pages
**What to build:**
- `DashboardPage.jsx` - Student dashboard
- `BookCatalogPage.jsx` - Browse and search books
- `BorrowingPage.jsx` - Borrow/return books
- `PaymentPage.jsx` - Upload payment screenshot
- `ProfilePage.jsx` - Edit profile information

**Features needed:**
- Book search and filtering (title, author, category, ISBN)
- Borrowing system (max 3 books, due dates)
- Payment upload with screenshot
- Personal borrowing history
- Profile management

### `src/pages/shared/` - Shared Pages
**What to build:**
- `HomePage.jsx` - Landing page
- `BookDetailPage.jsx` - Book information page
- `NotFoundPage.jsx` - 404 error page

### `src/components/ui/` - shadcn/ui Components
**What to add:**
- `Button.jsx` - Primary, secondary, destructive variants
- `Input.jsx` - Text inputs with validation
- `Card.jsx` - Content containers
- `Badge.jsx` - Status indicators
- `Modal.jsx` - Confirmation dialogs
- `Table.jsx` - Data tables
- `Form.jsx` - Form components
- `Alert.jsx` - Success/error messages

### `src/components/` - Custom Components
**What to build:**
- `Layout/` - Header, Sidebar, Footer
- `BookCard.jsx` - Book display component
- `SearchBar.jsx` - Book search functionality
- `PaymentUpload.jsx` - File upload component
- `StatusBadge.jsx` - Payment/borrowing status
- `BookForm.jsx` - Add/edit book form

### `src/services/` - API Services
**What to build:**
- `authService.js` - Login, register, logout
- `bookService.js` - Book CRUD operations
- `userService.js` - User management
- `paymentService.js` - Payment operations
- `borrowingService.js` - Borrow/return operations

### `src/context/` - State Management
**What to build:**
- `AuthContext.jsx` - User authentication state
- `BookContext.jsx` - Book data management
- `PaymentContext.jsx` - Payment state management

### `src/hooks/` - Custom Hooks
**What to build:**
- `useAuth.js` - Authentication logic
- `useBooks.js` - Book data fetching
- `usePayments.js` - Payment operations
- `useBorrowing.js` - Borrowing logic

### `src/utils/` - Utility Functions
**What to build:**
- `validation.js` - Form validation rules
- `dateUtils.js` - Date formatting and calculations
- `constants.js` - App constants
- `helpers.js` - Helper functions

## 🎯 Core Features to Implement

### 1. Authentication & Authorization
- User registration with role selection
- JWT-based authentication
- Protected routes based on user role
- Session management

### 2. Book Management (Admin)
- Add books: title, author, ISBN, category, year, copies
- Edit book details
- Delete books (if not borrowed)
- View all books with search/filter

### 3. Book Browsing (All Users)
- Search by title, author, category, ISBN
- Filter by availability
- Sort by various criteria
- Book details view

### 4. Borrowing System (Students)
- Borrow available books (max 3 per user)
- Return books
- View due dates and overdue status
- Borrowing history

### 5. Payment System
- Upload payment screenshot
- Admin approval/rejection
- Payment status tracking
- Membership activation

### 6. User Management (Admin)
- View all users
- Check borrowing history
- Block/unblock users
- User statistics

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## 📋 Development Guidelines

### Styling
- Use TailwindCSS classes for styling
- Follow shadcn/ui component patterns
- Maintain consistent spacing and colors
- Ensure responsive design

### State Management
- Use React Context for global state
- Keep component state local when possible
- Implement proper loading and error states

### API Integration
- Use Axios for HTTP requests
- Implement proper error handling
- Add loading states for async operations
- Use environment variables for API URLs

### Code Organization
- Keep components small and focused
- Use meaningful file and component names
- Add comments for complex logic
- Follow React best practices

## 🎨 UI/UX Requirements

### Design System
- Use shadcn/ui components consistently
- Implement light/dark theme support
- Follow accessibility guidelines
- Create intuitive navigation

### User Experience
- Clear error messages and validation
- Loading states for all async operations
- Responsive design for mobile/desktop
- Intuitive forms and workflows

## 🔧 Environment Setup

Create `.env` file for API configuration:
```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Library Management System
```

## 📝 Next Steps

1. **Week 1**: Set up authentication and basic book management
2. **Week 2**: Implement borrowing system and user management
3. **Week 3**: Add payment system and polish UI/UX

---

**Happy Coding! 🚀**
Build amazing features and create a great user experience for the Library Management System!
