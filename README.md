# Student Feedback Management API

A RESTful backend application designed to manage student feedback efficiently. Built using **Node.js, Express.js, MongoDB, and Mongoose**, this API allows users to submit feedback, retrieve feedback records with pagination, and update feedback review statuses.

## Features

* **Submit Feedback:** Accepts student name, course name, feedback message, and rating.
* **Retrieve Feedback:** Fetches all feedback records from MongoDB.
* **Pagination:** Supports page-based data retrieval using query parameters.
* **Sorting:** Displays the newest feedback first.
* **Rating Validation:** Accepts whole-number ratings between 1 and 5.
* **Status Management:** Updates feedback status between Pending and Reviewed.
* **Data Validation:** Uses Mongoose schema validation to maintain data consistency.
* **Error Handling:** Handles invalid requests, validation errors, and database errors.
* **Timestamps:** Automatically records creation and modification dates.

## Tech Stack

| Technology | Purpose                                                   |
| ---------- | --------------------------------------------------------- |
| Node.js    | JavaScript runtime for backend development                |
| Express.js | Framework for building REST APIs                          |
| MongoDB    | NoSQL database for storing feedback                       |
| Mongoose   | ODM for MongoDB schema definition and database operations |
| dotenv     | Manages environment variables                             |
| JavaScript | Backend programming language                              |
| Postman    | API testing                                               |

## Project Structure

```text
Student-Feedback-Management-API/
│
├── Results/
│   ├── GET.png
│   ├── MONGODB.png
│   ├── PATCH.png
│   └── POST.png
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/naitik2043/Student-Feedback-Management-API.git
```

### 2. Navigate to the Project Directory

```bash
cd Student-Feedback-Management-API
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory.

Add the following configuration:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/Student_Feedback
PORT=3000
```

You can also use your MongoDB Atlas connection string instead of the local MongoDB URL.

### 5. Start the Server

```bash
npm start
```

The server will start at:

```text
http://localhost:3000
```

The application connects to MongoDB before starting the Express server.

---

## API Endpoints

Base URL:

```text
http://localhost:3000
```

### 1. Submit Feedback

**Endpoint:**

```http
POST /api/feedback
```

**Request Body:**

```json
{
  "studentName": "Naitik Gupta",
  "courseName": "Data Structures",
  "message": "The course content is helpful and informative.",
  "rating": 5
}
```

**Successful Response:**

HTTP Status: `201 Created`

Returns the newly created feedback record, including its MongoDB ID, status, and timestamps.

The default feedback status is `Pending`.

### 2. Retrieve All Feedback

**Endpoint:**

```http
GET /api/feedback
```

Retrieves feedback records sorted by creation date, with the newest records appearing first.

**Pagination Example:**

```http
GET /api/feedback?page=1&limit=10
```

Parameters:

| Parameter | Description                | Default Value |
| --------- | -------------------------- | ------------- |
| page      | Page number                | 1             |
| limit     | Number of records per page | 10            |

**Response Format:**

```json
{
  "feedback": [],
  "currentPage": 1,
  "totalRecords": 25,
  "totalPages": 3
}
```

### 3. Update Feedback Status

**Endpoint:**

```http
PATCH /api/feedback/:id
```

Updates the status of an existing feedback record using its MongoDB ObjectId.

**Request Body:**

```json
{
  "status": "Reviewed"
}
```

Allowed status values:

* `Pending`
* `Reviewed`

The API validates the feedback ID and status before updating the record.

---

## Validation and Error Handling

The application implements validation to ensure reliable data storage.

| Field       | Validation                       |
| ----------- | -------------------------------- |
| studentName | Required string                  |
| courseName  | Required string                  |
| message     | Required string                  |
| rating      | Required integer between 1 and 5 |
| status      | Pending or Reviewed              |

### HTTP Status Codes

| Status Code | Description                         |
| ----------- | ----------------------------------- |
| 201         | Feedback created successfully       |
| 200         | Request completed successfully      |
| 400         | Invalid request or validation error |
| 404         | Feedback record not found           |
| 500         | Internal server or database error   |

---

## API Testing

The API endpoints can be tested using Postman.

The `Results` directory contains screenshots demonstrating:

* POST request for submitting feedback.
* GET request for retrieving feedback.
* PATCH request for updating feedback status.
* MongoDB database records.

---

## Future Improvements

* Implement DELETE functionality.
* Add filtering by rating and feedback status.
* Introduce admin authentication and authorization.
* Organize the backend using MVC architecture.
* Add automated API testing.
* Integrate Swagger for API documentation.
* Add rate limiting and additional security middleware.

---

## Author

**Naitik Gupta**

* GitHub: [@naitik2043](https://github.com/naitik2043)

---

⭐ If you find this project useful, consider giving the repository a star!
