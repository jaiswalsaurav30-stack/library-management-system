 # Library Management System

A web-based **Library Management System** developed using **HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB**.

The project provides functionality for managing books, categories, members, users, and book borrowing/return operations through a web frontend and REST APIs.

## Features

* User registration and login
* Password hashing using bcryptjs
* JWT-based authentication
* Book management
* Add, view, update, and delete books
* ISBN validation
* Track total and available book copies
* Category management
* Member management
* Book issue and return
* Borrowing records and history
* Automatic overdue fine calculation
* Overdue fine of **₹10 per overdue day**
* Prevents issuing unavailable books
* Prevents duplicate active borrowing
* Frontend and backend API integration

## Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* Fetch API
* Local Storage

### Backend

* Node.js
* Express.js
* REST API
* CommonJS

### Database

* MongoDB
* Mongoose

### Authentication and Security

* bcryptjs
* JSON Web Token (JWT)
* dotenv
* CORS

## Project Structure

```text
library-management-system/
│
├── frontend/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   │   ├── Book.js
│   │   │   ├── Borrowing.js
│   │   │   ├── Category.js
│   │   │   ├── Member.js
│   │   │   └── User.js
│   │   ├── routes/
│   │   └── server.js
│   │
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

## API Endpoints

### Authentication APIs

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |

### Book APIs

| Method | Endpoint          | Description                 |
| ------ | ----------------- | --------------------------- |
| GET    | `/api/books`      | Get all books               |
| GET    | `/api/books/:id`  | Get a book by ID            |
| POST   | `/api/books`      | Add a new book              |
| PUT    | `/api/books/:id`  | Update a book               |
| DELETE | `/api/books/:id`  | Delete or deactivate a book |
| GET    | `/api/books/test` | Test book API               |

### Category APIs

| Method | Endpoint              | Description                     |
| ------ | --------------------- | ------------------------------- |
| GET    | `/api/categories`     | Get all categories              |
| GET    | `/api/categories/:id` | Get category by ID              |
| POST   | `/api/categories`     | Add a category                  |
| PUT    | `/api/categories/:id` | Update a category               |
| DELETE | `/api/categories/:id` | Delete or deactivate a category |

### Member APIs

| Method | Endpoint           | Description                   |
| ------ | ------------------ | ----------------------------- |
| GET    | `/api/members`     | Get all members               |
| GET    | `/api/members/:id` | Get member by ID              |
| POST   | `/api/members`     | Add a member                  |
| PUT    | `/api/members/:id` | Update a member               |
| DELETE | `/api/members/:id` | Delete or deactivate a member |

### Borrowing APIs

| Method | Endpoint                     | Description            |
| ------ | ---------------------------- | ---------------------- |
| GET    | `/api/borrowings`            | Get borrowing records  |
| POST   | `/api/borrowings/issue`      | Issue a book           |
| PUT    | `/api/borrowings/:id/return` | Return a borrowed book |

## Database Models

The application uses the following MongoDB/Mongoose models:

* **User** — User authentication and account information
* **Book** — Book details, ISBN, copies, and availability
* **Category** — Book category information
* **Member** — Library member information
* **Borrowing** — Book issue and return records

## Environment Variables

Create a `.env` file inside the `server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

> **Note:** The actual `.env` file should not be committed to GitHub.

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/jaiswalsaurav30-stack/library-management-system.git
cd library-management-system
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the `server` folder and configure:

* MongoDB connection string
* JWT secret
* Server port

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Start the Backend

```bash
node src/server.js
```

The backend runs on:

```text
http://localhost:5000
```

### 5. Run the Frontend

Open the `frontend/index.html` file in a browser or use a local development server such as **VS Code Live Server**.

The frontend communicates with the backend through:

```text
http://localhost:5000/api
```

## Borrowing and Fine System

When a book is issued:

1. A borrowing record is created.
2. The available book copies are updated.
3. The system prevents issuing a book when no copy is available.
4. The system prevents duplicate active borrowing.

When a book is returned:

1. Return information is recorded.
2. Book availability is updated.
3. Overdue days are calculated.
4. A fine of **₹10 per overdue day** is applied when applicable.

## Security

The application includes:

* Password hashing using **bcryptjs**
* **JWT authentication**
* Environment variables for sensitive configuration
* `.gitignore` protection for `.env`
* `node_modules` excluded from Git

## Project Purpose

This project was developed as an **academic project** to demonstrate practical concepts of:

* Full-stack web development
* REST API development
* MongoDB database management
* Authentication
* CRUD operations
* Backend and frontend integration

## Author

**SAURAV KUMAR JAISWAL**

Diploma in Computer Science Engineering

## License

This project is intended for **educational and academic purposes**.
