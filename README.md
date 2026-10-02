\# Library Management System



A web-based Library Management System developed using HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB.



The project provides functionality for managing books, categories, members, users, and book borrowing/return operations through a web frontend and REST APIs.



\## Features



\- User registration and login

\- Password hashing using bcryptjs

\- JWT-based authentication

\- Book management

\- Add, view, update and delete books

\- ISBN validation

\- Track total and available book copies

\- Category management

\- Member management

\- Book issue and return

\- Borrowing records and history

\- Automatic overdue fine calculation

\- Overdue fine of ₹10 per overdue day

\- Prevents issuing unavailable books

\- Prevents duplicate active borrowing

\- Frontend and backend API integration



\## Technology Stack



\### Frontend

\- HTML5

\- CSS3

\- JavaScript

\- Fetch API

\- Local Storage



\### Backend

\- Node.js

\- Express.js

\- REST API

\- CommonJS



\### Database

\- MongoDB

\- Mongoose



\### Authentication and Security

\- bcryptjs

\- JSON Web Token (JWT)

\- dotenv

\- CORS



\## Project Structure



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

└── README.md| Method | Endpoint             | Description         |

| ------ | -------------------- | ------------------- |

| POST   | `/api/auth/register` | Register a new user |

| POST   | `/api/auth/login`    | Login user          |

| Method | Endpoint          | Description                 |

| ------ | ----------------- | --------------------------- |

| GET    | `/api/books`      | Get all books               |

| GET    | `/api/books/:id`  | Get a book by ID            |

| POST   | `/api/books`      | Add a new book              |

| PUT    | `/api/books/:id`  | Update a book               |

| DELETE | `/api/books/:id`  | Delete or deactivate a book |

| GET    | `/api/books/test` | Test book API               |

| Method | Endpoint              | Description                     |

| ------ | --------------------- | ------------------------------- |

| GET    | `/api/categories`     | Get all categories              |

| GET    | `/api/categories/:id` | Get category by ID              |

| POST   | `/api/categories`     | Add a category                  |

| PUT    | `/api/categories/:id` | Update a category               |

| DELETE | `/api/categories/:id` | Delete or deactivate a category |

| Method | Endpoint           | Description                   |

| ------ | ------------------ | ----------------------------- |

| GET    | `/api/members`     | Get all members               |

| GET    | `/api/members/:id` | Get member by ID              |

| POST   | `/api/members`     | Add a member                  |

| PUT    | `/api/members/:id` | Update a member               |

| DELETE | `/api/members/:id` | Delete or deactivate a member |

| Method | Endpoint                     | Description            |

| ------ | ---------------------------- | ---------------------- |

| GET    | `/api/borrowings`            | Get borrowing records  |

| POST   | `/api/borrowings/issue`      | Issue a book           |

| PUT    | `/api/borrowings/:id/return` | Return a borrowed book |

Database Models



The application uses the following MongoDB/Mongoose models:



User — User authentication and account information

Book — Book details, ISBN, copies and availability

Category — Book category information

Member — Library member information

Borrowing — Book issue and return records

Environment VariablesCreate a .env file inside the server folder:PORT=5000

MONGO\_URI=your\_mongodb\_connection\_string

JWT\_SECRET=your\_jwt\_secretThe actual .env file should not be committed to GitHub.Installation

1\. Clone the repository

git clone https://github.com/jaiswalsaurav30-stack/library-management-system.git

cd library-management-system

2\. Install backend dependencies

cd server

npm install

3\. Configure environment variables



Create a .env file inside the server folder and configure the MongoDB connection string and JWT secret.



4\. Start the backend

node src/server.js



The backend runs on:



http://localhost:5000

5\. Run the frontend



Open the frontend index.html file in a browser or use a local development server such as VS Code Live Server.



The frontend communicates with the backend through:



http://localhost:5000/api

Borrowing and Fine System



When a book is issued, the borrowing record is created and the available book copies are updated.



When a book is returned:



The return information is recorded.

Book availability is updated.

Overdue days are calculated.

A fine of ₹10 per overdue day is applied when applicable.

Security



The application includes:



Password hashing using bcryptjs

JWT authentication

Environment variables for sensitive configuration

.gitignore protection for .env

node\_modules excluded from Git

Project Purpose



This project was developed as an academic project to demonstrate practical concepts of:



Full-stack web development

REST API development

MongoDB database management

Authentication

CRUD operations

Backend and frontend integration

Author



Saurav Jaiswal



Diploma in Computer Science Engineering



License



This project is intended for educational and academic purposes.





\### Abhi bas ye karo:



\*\*Ctrl + S → Notepad close\*\*



Uske baad \*\*PowerShell mein sirf\*\*:



```powershell

git status

