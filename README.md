# Employee Management System

## Tech Stack
- Node JS
- MongoDB
- Express Js

## Feature List

### User Authentication
- **User Registration**: New users can register for an account using the `POST /auth/register` endpoint.
- **User Login**: Registered users can authenticate and receive a JWT using the `POST /auth/login` endpoint.
- **Password Security**: User passwords are hashed using bcrypt for secure storage.

### Role-Based Authorization
- **User Roles**: Users are assigned roles defined in the schema: "Admin" and "Employee".
- **Access Control**: Middleware restricts access to certain routes based on user roles.

### CRUD Operations for Employees
- **List Employees**: Admins can get a list of employees using the `GET /employees` endpoint. The list supports pagination.
- **View Employee Data**: Admins or the employee themselves can view an employee's data using the `GET /employees/:id` endpoint.
- **Add New Employee**: Admins can add a new employee using the `POST /employees` endpoint.
- **Update Employee Data**: Admins or the employee themselves can update an employee's data using the `PUT /employees/:id` endpoint.
- **Delete Employee**: Admins can delete an employee using the `DELETE /employees/:id` endpoint.

## Setup
- **Node.js Project**: The project is initialized as a Node.js project.
- **Required Dependencies**: The project uses Express, Passport, bcrypt, jwt, mongoose, and other necessary dependencies.
- **Database**: The project uses a MongoDB database and connects to it using Mongoose.

## API Documentation
You can view the API documentation at http://localhost:3000/api-docs/#/

## Used Packages
The project uses the following npm packages:
- bcrypt
- body-parser
- dotenv
- express
- jsonwebtoken
- mongoose
- passport
- passport-jwt
- swagger-jsdoc
- swagger-ui-express

To generate a new JWT secret, use the following command:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
