# Production-Level Token-Based Authentication API

This project provides a secure, token-based authentication system built with Node.js and Express. It uses JSON Web Tokens (JWT) for authentication and implements several security best practices.

## Features

- **User Registration**: Secure password hashing using `bcrypt`.
- **User Login**: Generates a JSON Web Token (JWT) upon successful login.
- **Protected Routes**: Middleware to verify JWT tokens and restrict access.
- **Security Middleware**:
  - `helmet`: Sets various HTTP headers to secure the app.
  - `cors`: Enables Cross-Origin Resource Sharing.
  - `express-rate-limit`: Prevents brute-force attacks and DDoS by limiting repeated requests.
- **Input Validation**: Uses `joi` to validate request payloads and ensure data integrity.
- **Mock Database**: Uses an in-memory storage simulation via asynchronous operations to mimic a real database interactions for demonstration purposes.

## Architecture

The project follows the Model-View-Controller (MVC) pattern (without Views since it's an API) to keep the code modular and maintainable.

```
Authentication/token-based/
├── server.js                 # Entry point, configures Express app, security, and routes
├── .env.example              # Example environment variables
├── package.json              # Project dependencies and scripts
└── src/
    ├── controllers/
    │   └── auth.controller.js  # Contains logic for register, login, and profile fetching
    ├── middlewares/
    │   └── auth.middleware.js  # Middleware to extract and verify JWT
    ├── models/
    │   └── user.model.js       # Mock User model with methods like findByEmail, save, etc.
    └── routes/
        └── auth.routes.js      # Defines API endpoints and maps them to controllers
```

## Setup Instructions

1.  **Navigate to the project directory:**
    ```bash
    cd Authentication/token-based
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Copy `.env.example` to `.env` and fill in your desired configuration:
    ```bash
    cp .env.example .env
    ```
    Make sure to change `JWT_SECRET` to a strong, random string in production.

4.  **Run the Server:**
    ```bash
    node server.js
    ```
    The server will start on port 3000 (or the port defined in your `.env` file).

## API Endpoints

-   `POST /api/auth/register`: Register a new user.
    -   Body: `{ "username": "user123", "email": "user@example.com", "password": "password123" }`
-   `POST /api/auth/login`: Login an existing user and get a JWT.
    -   Body: `{ "email": "user@example.com", "password": "password123" }`
-   `GET /api/auth/profile`: Get the logged-in user's profile (requires authentication).
    -   Headers: `Authorization: Bearer <your_jwt_token>`

## Security Best Practices Included

-   **Password Hashing**: Passwords are never stored in plain text. `bcrypt` adds a salt and hashes the password securely.
-   **Token Expiration**: JWTs have a set expiration time (`JWT_EXPIRES_IN`) to limit the window of opportunity if a token is compromised.
-   **Rate Limiting**: Protects against automated login attempts and general API abuse.
-   **Input Validation**: Validating input before processing prevents unexpected errors and injection attacks.
-   **HTTP Headers**: `helmet` sets headers that protect against common web vulnerabilities like Cross-Site Scripting (XSS) and clickjacking.
