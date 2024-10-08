1. Project Overview

This project is a restaurant reservation system. Users can create, update, cancel, and view restaurant reservations through this system. User authentication and authorization levels are implemented, allowing different permissions based on user roles. The project is secured with JWT, and audit logs are kept for every operation.

2. Technologies

Node.js and Express.js: Main technologies for the backend.
MongoDB: NoSQL database for data storage.
Mongoose: ODM used to interact with MongoDB.
Winston: Used as a logger to record all server events.
JWT (JSON Web Token): Used for user authentication and authorization.
Swagger: Used for API documentation.
Express Validator: Used for validating incoming data.
Nodemailer: Used for sending emails to users (e.g., for password resets).
Rate Limiter: Used to prevent excessive requests to the API.
3. Setup and Requirements

Node.js and npm must be installed.
A MongoDB server must be running.
Installation instructions:

Install all dependencies using the npm install command.
Configure configuration parameters such as PORT, JWT_KEY, and MONGO_PATH in the .env file.
Start the server with the command npm start.
4. API Endpoints

User Authentication and Roles:

/auth/register - Register a new user.
/auth/login - User login and obtain JWT.
/auth/refresh-token - Obtain a new access token using the refresh token.
/auth/logout - Log out the user.
/auth/forget-password - Request password reset.
/auth/reset-password/:resetToken - Reset password.
User Management:

/user/ - Get all users (admin and manager only).
/user/:id - Get a user by ID.
/user/update-role/:id - Update a user role (admin only).
/user/:id - Delete a user by ID (admin only).
Reservation Management:

/reserve/ - Get all reservations (admin only).
/reserve/:id - Get a reservation by ID.
/reserve/:id - Update a reservation.
/reserve/:id - Delete a reservation.
Reservation System Details

The reservation system allows users to book tables at the restaurant. The following operations are available:

Create a new reservation: Users can create a reservation for a specific date and time once logged in.
View reservations: Admin users can see all reservations, while other users can only see their own reservations.
Update or cancel reservations: Users can update or cancel their own reservations.
5. Security and Roles

JWT Authentication: When users log in, they are provided with a JSON Web Token (JWT) by the server. This token allows users to perform operations on their behalf and is used in the "Authorization" header in each request.

Refresh Token Mechanism: When the access token expires, the refresh token is used to obtain a new access token without requiring the user to log in again. Refresh tokens are valid for a longer period and are stored in cookies. Using the refresh token endpoint (/auth/refresh-token), the user can obtain a new access token.

User Roles: The system has different roles:

User: Can create, view, update, and cancel their reservations.
Manager: Can view all users but cannot manage them.
Admin: Can manage all users and reservations. Has rights such as changing roles and deleting users.
6. Features and Functionality

Audit Log: Every operation (create, delete, update, etc.) is logged in the audit log, allowing tracking of who performed an action and when.

Rate Limiting: To ensure the security of the system, a limited number of requests are allowed per IP within a specific timeframe.

Validation: Express Validator is used to ensure incoming data is in the correct format.

Email Notifications: Notifications are sent to users for operations such as password reset.

Swagger Documentation: Swagger is used to document and facilitate API usage. You can see how the APIs work by accessing the /api-docs endpoint.