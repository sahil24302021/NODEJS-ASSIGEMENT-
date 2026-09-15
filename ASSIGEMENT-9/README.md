# User Management API (PATCH & DELETE)

## Assignment 9

An Express.js and MongoDB REST API implementing **Update (PATCH)** and **Delete (DELETE)** operations using Mongoose, organized with a clean modular MVC-style architecture.

---

## Objective

The objective of this assignment is to:
- Connect an Express.js backend application to MongoDB using **Mongoose**.
- Display `"MongoDB connected successfully"` upon establishing a successful database connection.
- Implement a **PATCH** route (`/api/users/:id`) to read the ID from `req.params`, read updated fields from `req.body`, and partially update user details using Mongoose.
- Implement a **DELETE** route (`/api/users/:id`) to read the ID from `req.params` and remove the user document from MongoDB.
- Separate code into modular directories: `schema/`, `model/`, and `router/`.
- Handle potential errors including invalid ObjectIDs, non-existent records, empty update payloads, and database server failures.
- Verify API endpoints using **Thunder Client** and inspect MongoDB collections via **MongoDB Compass**.

---

## Technologies Used

- **Runtime Environment:** Node.js
- **Web Framework:** Express.js (`v5.2.1`)
- **Database:** MongoDB (Local instance at `mongodb://127.0.0.1:27017/assignment8`)
- **Object Data Modeling (ODM):** Mongoose (`v9.10.1`)
- **API Testing:** Thunder Client (VS Code Extension)
- **Database GUI:** MongoDB Compass

---

## Project Structure

```text
ASSIGEMENT-9/
├── model/
│   └── userModel.js          # Mongoose model compiled from userSchema
├── router/
│   └── userRouter.js         # Express router handling PATCH and DELETE endpoints
├── schema/
│   └── userSchema.js         # Mongoose schema definition with validation rules
├── SCREENSHOT/               # Execution screenshots for server, API tests, and DB
│   ├── Screenshot 2026-09-16 at 12.23.52 AM.png
│   ├── Screenshot 2026-09-16 at 12.24.31 AM.png
│   ├── Screenshot 2026-09-16 at 12.24.48 AM.png
│   ├── Screenshot 2026-09-16 at 12.25.30 AM.png
│   └── Screenshot 2026-09-16 at 12.25.39 AM.png
├── package.json              # Project configuration and dependencies
├── package-lock.json         # Locked dependency tree
├── server.js                 # Application entry point and database connection
└── README.md                 # Project documentation
```

---

## MongoDB Connection

The database connection is configured in `server.js` using Mongoose:

```javascript
mongoose.connect("mongodb://127.0.0.1:27017/assignment8")
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });
```

When the application starts, it connects to the local MongoDB database and outputs:
```text
Server running on port 5000
MongoDB connected successfully
```

---

## API Endpoints

### 1. Update User (PATCH)
- **URL:** `/api/users/:id`
- **Method:** `PATCH`
- **Description:** Updates specified fields (`name`, `email`, `age`, `course`) of an existing user.
- **URL Parameters:**
  - `id`: Valid 24-character hexadecimal MongoDB ObjectId.
- **Request Headers:**
  - `Content-Type: application/json`
- **Query / Body Logic:**
  - Validates MongoDB ObjectId using `mongoose.Types.ObjectId.isValid(id)`.
  - Ensures the request body contains fields to update.
  - Updates the document using `User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })`.

### 2. Delete User (DELETE)
- **URL:** `/api/users/:id`
- **Method:** `DELETE`
- **Description:** Permanently removes a user record from the database.
- **URL Parameters:**
  - `id`: Valid 24-character hexadecimal MongoDB ObjectId.
- **Query / Body Logic:**
  - Validates MongoDB ObjectId using `mongoose.Types.ObjectId.isValid(id)`.
  - Deletes the record using `User.findByIdAndDelete(id)`.

---

## Request and Response Examples

### Update User (`PATCH /api/users/:id`)

**Request:**
- **Method:** `PATCH`
- **Endpoint:** `http://localhost:5000/api/users/6aa46a816c547ea800159792`
- **Request Body:**
```json
{
  "age": 23,
  "course": "MCA"
}
```

**Response (`200 OK`):**
```json
{
  "message": "User updated successfully",
  "user": {
    "_id": "6aa46a816c547ea800159792",
    "name": "Sahil Kumar",
    "email": "sahil.kumar@example.com",
    "age": 23,
    "course": "MCA",
    "__v": 0
  }
}
```

---

### Delete User (`DELETE /api/users/:id`)

**Request:**
- **Method:** `DELETE`
- **Endpoint:** `http://localhost:5000/api/users/6aa46a816c547ea800159792`

**Response (`200 OK`):**
```json
{
  "message": "User deleted successfully"
}
```

---

## Error Handling

The application provides comprehensive error handling across all routes:

| Scenario | HTTP Status | Response Payload |
| :--- | :--- | :--- |
| **Invalid MongoDB ID** | `400 Bad Request` | `{"message": "Invalid user ID"}` |
| **Missing Update Data** | `400 Bad Request` | `{"message": "No update data provided"}` |
| **User Not Found** | `404 Not Found` | `{"message": "User not found"}` |
| **Database Server Error** | `500 Internal Server Error` | `{"message": "Database error", "error": "<error_message>"}` |

---

## How to Run the Project

1. **Navigate to the Project Directory:**
   ```bash
   cd ASSIGEMENT-9
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Ensure MongoDB is Running:**
   Make sure your local MongoDB daemon (`mongod`) is running on `mongodb://127.0.0.1:27017`.

4. **Start the Server:**
   ```bash
   npm start
   ```
   *(or run directly with `node server.js`)*

5. **Test the Endpoints:**
   Send requests to `http://localhost:5000/api/users/:id` using Thunder Client or Postman.

---

## Screenshots

### 1. MongoDB Connection and Server Startup
Server successfully running on port 5000 with MongoDB connected.

![MongoDB Connection and Server](<./SCREENSHOT/Screenshot 2026-09-16 at 12.23.52 AM.png>)

---

### 2. Update User API (PATCH Request)
Thunder Client testing `PATCH /api/users/:id` returning status `200 OK` and updated user data.

![Update User API](<./SCREENSHOT/Screenshot 2026-09-16 at 12.24.31 AM.png>)

---

### 3. MongoDB Compass Verification (Updated User)
MongoDB Compass showing the updated document fields (`age: 23`, `course: "MCA"`).

![MongoDB Compass - Updated User](<./SCREENSHOT/Screenshot 2026-09-16 at 12.24.48 AM.png>)

---

### 4. Delete User API (DELETE Request)
Thunder Client testing `DELETE /api/users/:id` returning status `200 OK` with confirmation message.

![Delete User API](<./SCREENSHOT/Screenshot 2026-09-16 at 12.25.30 AM.png>)

---

### 5. MongoDB Compass Verification (Deleted User)
MongoDB Compass confirming document removal from the collection.

![MongoDB Compass - Deleted User](<./SCREENSHOT/Screenshot 2026-09-16 at 12.25.39 AM.png>)
