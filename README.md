# TRIFT ME (TEAM PROJECT)
A Simple mevm E-commerce System Built with Nodejs, MongoDB, Vuejs and TailwindCSS



## 🔗 Index

1. [Purpose of this project](#1-Purpose-of-this-project)
2. [Features](#2-Features)
3. [Technologies](#3--Technologies)


## Installation of the project
Execute the following command to execute project
```bash
# Install dependencies
cd front
npm install

cd back
npm install

# Start Express Server: http://localhost:4000
cd back
node app.js

# Start Vue DevServer: http://localhost:8080
cd front
npm run serve

# Build for production (Will build into server/public, ready for deployment)
cd front
npm run build
```

## 1. Purpose of this project
- Make e-commerce CRUD application 
- Using jwt for authentication (Divide functionality it user is logged in or not)
- Collaborative git 
- Agile methodology ( Kanban ) Practice


## 2. Features
Frontend (Vue.js):
A product listing page that displays products with details such as name, description, price, and image.

A form to add new products (only for authenticated users).
A search bar to filter products by name.
A login form for user authentication.
Responsive design to ensure compatibility across different devices.
Backend (Node.js + Express):
An API to manage products (CRUD operations: Create, Read, Update, Delete).
An API for user authentication (login).
Middleware to protect routes (only authenticated users can add, update, or delete products).
Integration with a database MongoDB to store user and product information.
 Database:

 A users collection/table with fields: username, password (hashed), and email.

A products collection/table with fields: name, description, price, imageURL, and createdBy (user reference). 


## 3. Technologies
Frontend (Vue.js):

Use Vue CLI to scaffold the project.
Utilize Vue Router for navigation between pages.
Implement state management using Vuex.
Ensure the application is responsive using CSS frameworks  Tailwind CSS
Backend (Node.js + Express):

Use Express to set up the server.
Implement JWT (JSON Web Tokens) for authentication.
Use Mongoose/MongoDB for database operations.
Include error handling and input validation.