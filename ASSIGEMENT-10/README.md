# Express.js Firebase Firestore User API

## Assignment 10

A RESTful backend API built with **Express.js**, **Firebase Admin SDK (Cloud Firestore)**, and **Joi Validation**, following a clean modular architecture.

---

## Objective

The objective of this assignment is to:
- Connect an Express.js backend application to **Google Firebase Firestore** using the **Firebase Admin SDK**.
- Implement schema-based request validation using **Joi** to validate input data before database insertion.
- Build a `POST /api/users` endpoint to store validated user details in the Firestore `users` collection.
- Return appropriate HTTP status codes and structured responses for both success (`201 Created`) and validation failures (`400 Bad Request`).
- Organize the project into dedicated modules: `config/`, `schema/`, and `router/`.
- Test and verify the API using **Thunder Client** and inspect stored documents in the **Firebase Cloud Firestore Console**.

---

## Features

- **Express.js Server:** Modular routing and JSON body parsing.
- **Firebase Firestore Integration:** Persistent cloud NoSQL document storage using the Firebase Admin SDK.
- **Schema Validation with Joi:** Strict validation rules (`abortEarly: false`) returning comprehensive error feedback.
- **Custom Error Messages:** Descriptive validation error messages for missing or malformed fields.
- **Auto-generated Document IDs:** Firestore creates unique document IDs upon successful insertion.
- **Robust Error Handling:** Distinguishes between client-side validation errors (`400`) and internal database errors (`500`).

---

## Technologies Used

- **Runtime Environment:** Node.js (`v26.x`)
- **Web Framework:** Express.js (`v5.2.1`)
- **Database:** Google Cloud Firestore (Firebase)
- **SDK:** Firebase Admin SDK (`v14.4.0`)
- **Validation Library:** Joi (`v18.2.9`)
- **API Testing:** Thunder Client (VS Code Extension)
- **Database Management:** Firebase Console

---

## Project Structure

```text
ASSIGEMENT-10/
├── config/
│   └── firebase.js            # Firebase Admin SDK initialization & Firestore instance
├── router/
│   └── userRouter.js           # POST /api/users endpoint with validation and DB logic
├── schema/
│   └── userSchema.js           # Joi validation schema and custom error messages
├── screenshots/               # API execution and Firebase Console screenshots
│   ├── 1.png                  # Server & Firebase connection startup
│   ├── 2.png                  # Successful POST request in Thunder Client
│   ├── 3.png                  # Data stored in Firebase Firestore console
│   └── 4.png                  # Validation error handling (400 Bad Request)
├── .gitignore                 # Excludes node_modules and service account credentials
├── assignment10-*.json        # Firebase service account private key
├── package.json               # Dependencies and start scripts
├── package-lock.json          # Dependency lockfile
├── server.js                  # Application entry point
└── README.md                  # Project documentation
```

---

## User Validation Schema (Joi)

The incoming request payload is validated using Joi with the following schema rules:

| Field | Type | Validation Rules | Custom Error Message |
| :--- | :--- | :--- | :--- |
| **`name`** | `String` | Trimmed, Required | `"Name is required"` |
| **`email`** | `String` | Valid Email format, Required | `"Please provide a valid email"`, `"Email is required"` |
| **`age`** | `Number` | Integer, Min `18`, Max `100`, Required | `"Age must be a number"`, `"Age must be at least 18"`, `"Age must not exceed 100"` |
| **`course`** | `String` | Trimmed, Required | `"Course is required"` |

> [!NOTE]
> The validation option `{ abortEarly: false }` is enabled so that all validation errors are collected and returned simultaneously, rather than halting at the first failure.

---

## Firebase Setup and Connection

1. A Firebase project was created on the **Firebase Console**.
2. **Cloud Firestore** was provisioned in test/production mode.
3. A service account private key was generated and downloaded from **Project Settings > Service Accounts**.
4. In `config/firebase.js`, the Admin SDK is initialized using credentials:

```javascript
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require("../assignment10-35296-firebase-adminsdk-fbsvc-4d95382802.json");

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

console.log("Firebase connected successfully");

module.exports = db;
```

---

## API Endpoint Details

### Create User (`POST /api/users`)

- **URL:** `http://localhost:5000/api/users`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Description:** Validates the user payload against the Joi schema and saves a new document to the Firestore `users` collection.

---

## Request & Response Examples

### 1. Successful User Creation (`201 Created`)

**Request Body:**
```json
{
  "name": "Sahil Kumar",
  "email": "sahil@example.com",
  "age": 22,
  "course": "MCA"
}
```

**Response Body (`201 Created`):**
```json
{
  "message": "User stored successfully",
  "userId": "owHu13iBsh0JzY0AcB1z"
}
```

---

### 2. Validation Failure (`400 Bad Request`)

**Request Body (Invalid Data):**
```json
{
  "name": "",
  "email": "wrong-email",
  "age": 15,
  "course": ""
}
```

**Response Body (`400 Bad Request`):**
```json
{
  "message": "Validation failed",
  "errors": [
    "Name is required",
    "Please provide a valid email",
    "Age must be at least 18",
    "Course is required"
  ]
}
```

---

### 3. Database Server Error (`500 Internal Server Error`)

If Firestore is unreachable or an internal error occurs:
```json
{
  "message": "Database error",
  "error": "<error_message>"
}
```

---

## Request Processing Flow

```text
       Incoming POST /api/users
                  │
                  ▼
         [ Express Router ]
                  │
                  ▼
       [ Joi Schema Validation ]
        ({ abortEarly: false })
                  │
         ┌────────┴────────┐
         │                 │
    (Valid Data)    (Invalid Data)
         │                 │
         ▼                 ▼
   [ Firestore ]     [ 400 Bad Request ]
 (users.add(...))    Returns array of errors
         │
         ▼
  [ 201 Created ]
 Returns doc userId
```

---

## How to Run the Project

1. **Navigate to the Project Directory:**
   ```bash
   cd ASSIGEMENT-10
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```
   *(Required packages: `express`, `firebase-admin`, `joi`)*

3. **Service Account Credentials:**
   Ensure the Firebase Service Account JSON key is present in the project root and referenced in `config/firebase.js`. Keep this file in `.gitignore` to prevent credential exposure.

4. **Start the Server:**
   ```bash
   npm start
   ```
   *(or run `node server.js`)*

   Expected terminal output:
   ```text
   Firebase connected successfully
   Server running on port 5000
   ```

5. **Test the API:**
   Send a `POST` request to `http://localhost:5000/api/users` using Thunder Client or Postman.

---

## Screenshots

### 1. Successful Firebase Connection and Server Startup
Server initialization on port 5000 confirming successful Firebase connection.

![Firebase Connection and Server Startup](./screenshots/1.png)

---

### 2. Successful POST Request (Thunder Client)
Thunder Client executing a `POST` request to `/api/users` with valid data, returning `201 Created` with a new `userId`.

![Successful POST Request](./screenshots/2.png)

---

### 3. Stored Document in Firebase Firestore Console
Firebase Cloud Firestore console verifying the new document saved inside the `users` collection.

![Firestore Document](./screenshots/3.png)

---

### 4. Schema Validation Error Handling
Thunder Client testing `POST /api/users` with invalid inputs, returning `400 Bad Request` with specific validation error messages.

![Validation Error Response](./screenshots/4.png)

---

## Conclusion

This assignment successfully demonstrates:
1. Seamless integration of Node.js / Express.js with Google Cloud Firestore via the Firebase Admin SDK.
2. Robust schema-based input validation with Joi prior to database persistence.
3. Clean separation of concerns with a modular codebase architecture (`config`, `schema`, `router`).
4. Comprehensive error handling with proper HTTP status codes (`201`, `400`, `500`).