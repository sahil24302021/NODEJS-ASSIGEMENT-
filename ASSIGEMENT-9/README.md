# User Management API (PATCH & DELETE)

## Assignment 9

An Express.js and MongoDB REST API implementing **Update (PATCH)** and **Delete (DELETE)** operations using Mongoose, organized with a clean modular MVC-style architecture.




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
