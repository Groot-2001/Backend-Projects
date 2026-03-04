# Session-Based Authentication Demo (Node.js + Express)

A simple authentication system built using **Node.js, Express, EJS, and express-session** to demonstrate how **session-based authentication works**.

This project includes:

* Login page
* Session creation after authentication
* Protected home route
* Logout functionality
* Demonstration users for testing

---

# 🚀 Features

* Session-based authentication
* Express session middleware
* Protected routes
* Login error handling
* Logout with session destruction
* Clean UI with animated gradient backgrounds
* EJS templating

---

# 🧠 How Session-Based Authentication Works

1. User submits login credentials.
2. Server validates the credentials.
3. If valid, the server creates a **session**.
4. The session ID is stored in a **cookie (`connect.sid`)** in the browser.
5. For every request, the browser sends this cookie automatically.
6. The server checks the session ID and retrieves the stored session.
7. If the session exists, the user is authenticated.
8. When the user logs out, the session is destroyed.

## workflow

![workflow Page](screenshots/workflow.png)


Architecture flow:

Browser
↓
Login Request
↓
Server creates Session
↓
Session ID stored in Cookie
↓
Browser sends Cookie in every request
↓
Server verifies session

---

# 👤 Demo Credentials

You can log in using the following demo accounts:

| Username | Password |
| -------- | -------- |
| user123  | 123      |
| shiva    | 123      |
| Raju     | 123      |

---

# 📸 Screenshots

## Login Page

![Login Page](screenshots/login.png)

---

## Login Error Example

![Login Error](screenshots/login-error.png)

---

## Home Dashboard

![Dashboard](screenshots/dashboard.png)

---

# 🛠 Tech Stack

* **Node.js**
* **Express.js**
* **express-session**
* **EJS**
* **HTML / CSS**

---

# 📂 Project Structure

```
project
│
├── views
│   ├── login.ejs
│   └── home.ejs
│
├── screenshots
│   ├── login.png
│   ├── login-error.png
│   └── dashboard.png
│
├── server.js
├── package.json
└── README.md
```

---

# ⚙️ Installation

Clone the repository

```
git clone https://github.com/Groot-2001/Backend-Projects.git
```

Navigate into the project

```
cd session-auth-demo
```

Install dependencies

```
npm install
```

---

# ▶️ Run the Application

Start the server:

```
node server.js
```

Server will start on:

```
http://localhost:3000
```

---

# 🔐 Important Notes

* This project uses **in-memory session storage**, which is suitable for demos but **not recommended for production**.

* In production environments, sessions should be stored in:

* Redis

* Database

* Distributed session store

Example:

```
Redis Session Store
```

---

# 📈 Future Improvements

Possible enhancements:

* Redis session store
* Rate limiting for login attempts
* CSRF protection
* Password hashing with bcrypt
* JWT authentication comparison
* Remember-me functionality
* OAuth login (Google/GitHub)

---

## 📈 Scaling Considerations (Session Storage)

The default `express-session` **MemoryStore** is useful for development and small demos but does not scale well for real-world applications.

Below is a rough guideline for choosing a session storage solution based on traffic.

| Daily Requests                   | Recommended Session Store                                                       | Reason                                                                               |
| -------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **0 – 5,000 requests/day**       | MemoryStore (default)                                                           | Suitable for local development or small demos. Sessions are stored in server memory. |
| **5,000 – 100,000 requests/day** | Redis                                                                           | Fast in-memory datastore designed for session management and caching.                |
| **100,000 – 1M+ requests/day**   | Redis Cluster or Managed Redis                                                  | Handles higher concurrency and distributed systems.                                  |
| **1M+ requests/day**             | Distributed session store (Redis Cluster / DynamoDB / Database-backed sessions) | Required for horizontal scaling across multiple servers.                             |

### Why MemoryStore Is Not Recommended for Production

* Sessions are stored **in server RAM**
* Memory usage grows with active users
* Sessions are lost if the server restarts
* Not shared between multiple servers

### Example Production Architecture

Browser
↓
Session Cookie (`connect.sid`)
↓
Load Balancer
↓
Application Servers
↓
Redis Session Store

### Example Redis Session Setup

```javascript
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const redisClient = require("./redis-client");

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  })
);
```

Redis ensures:

* Faster session retrieval
* Shared session storage across multiple servers
* Better scalability for high-traffic applications


# 📜 License

This project is open-source and available under the MIT License.

---

# 👨‍💻 Author

**Shiva Swami**

Software Engineer | Backend Enthusiast

---

If you found this project helpful, consider giving it a ⭐ on GitHub.
