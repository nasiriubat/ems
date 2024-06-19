
### Project Routes

#### GET `/api/projects`
- Description: Fetch all projects
- Example Response:
  ```json
  [
    {
      "_id": "609c1cc2b1f95d001e09cbbe",
      "name": "Project A",
      "description": "This is project A",
      "manager": "John Doe",
      "employees": [
        {
          "_id": "609c1cc2b1f95d001e09cbc0",
          "name": "Alice",
          "email": "alice@example.com"
        },
        {
          "_id": "609c1cc2b1f95d001e09cbc1",
          "name": "Bob",
          "email": "bob@example.com"
        }
      ],
      "tasks": [
        {
          "_id": "609c1cc2b1f95d001e09cbc3",
          "title": "Task 1",
          "description": "Complete task 1",
          "status": "pending"
        },
        {
          "_id": "609c1cc2b1f95d001e09cbc4",
          "title": "Task 2",
          "description": "Review task 2",
          "status": "done"
        }
      ]
    },
    {
      "_id": "609c1cc2b1f95d001e09cbbf",
      "name": "Project B",
      "description": "This is project B",
      "manager": "Jane Doe",
      "employees": [
        {
          "_id": "609c1cc2b1f95d001e09cbc2",
          "name": "Charlie",
          "email": "charlie@example.com"
        }
      ],
      "tasks": [
        {
          "_id": "609c1cc2b1f95d001e09cbc5",
          "title": "Task 3",
          "description": "Implement task 3",
          "status": "pending"
        }
      ]
    }
  ]
  ```

#### GET `/api/projects/:id`
- Description: Fetch project by ID
- Example Response:
  ```json
  {
    "_id": "609c1cc2b1f95d001e09cbbe",
    "name": "Project A",
    "description": "This is project A",
    "manager": "John Doe",
    "employees": [
      {
        "_id": "609c1cc2b1f95d001e09cbc0",
        "name": "Alice",
        "email": "alice@example.com"
      },
      {
        "_id": "609c1cc2b1f95d001e09cbc1",
        "name": "Bob",
        "email": "bob@example.com"
      }
    ],
    "tasks": [
      {
        "_id": "609c1cc2b1f95d001e09cbc3",
        "title": "Task 1",
        "description": "Complete task 1",
        "status": "pending"
      },
      {
        "_id": "609c1cc2b1f95d001e09cbc4",
        "title": "Task 2",
        "description": "Review task 2",
        "status": "done"
      }
    ]
  }
  ```

#### POST `/api/projects`
- Description: Create a new project
- Example Request Body:
  ```json
  {
    "name": "New Project",
    "description": "This is a new project",
    "manager": "Eve",
    "employees": ["609c1cc2b1f95d001e09cbc0"],
    "tasks": [
      {
        "title": "Task 1",
        "description": "Complete task 1"
      }
    ]
  }
  ```
- Example Response:
  ```json
  {
    "_id": "609c1cc2b1f95d001e09cbc6",
    "name": "New Project",
    "description": "This is a new project",
    "manager": "Eve",
    "employees": ["609c1cc2b1f95d001e09cbc0"],
    "tasks": [
      {
        "_id": "609c1cc2b1f95d001e09cbc7",
        "title": "Task 1",
        "description": "Complete task 1",
        "status": "pending"
      }
    ]
  }
  ```

#### PUT `/api/projects/:id`
- Description: Update project by ID
- Example Request Body:
  ```json
  {
    "description": "Updated project description"
  }
  ```
- Example Response:
  ```json
  {
    "_id": "609c1cc2b1f95d001e09cbbe",
    "name": "Project A",
    "description": "Updated project description",
    "manager": "John Doe",
    "employees": [
      {
        "_id": "609c1cc2b1f95d001e09cbc0",
        "name": "Alice",
        "email": "alice@example.com"
      },
      {
        "_id": "609c1cc2b1f95d001e09cbc1",
        "name": "Bob",
        "email": "bob@example.com"
      }
    ],
    "tasks": [
      {
        "_id": "609c1cc2b1f95d001e09cbc3",
        "title": "Task 1",
        "description": "Complete task 1",
        "status": "pending"
      },
      {
        "_id": "609c1cc2b1f95d001e09cbc4",
        "title": "Task 2",
        "description": "Review task 2",
        "status": "done"
      }
    ]
  }
  ```

#### DELETE `/api/projects/:id`
- Description: Delete project by ID
- Example Response:
  ```json
  {
    "message": "Project deleted successfully!"
  }
  ```

### Task Routes

#### GET `/api/tasks`
- Description: Fetch all tasks
- Example Response:
  ```json
  [
    {
      "_id": "609c1cc2b1f95d001e09cbc3",
      "title": "Task 1",
      "description": "Complete task 1",
      "status": "pending",
      "project": {
        "_id": "609c1cc2b1f95d001e09cbbe",
        "name": "Project A"
      },
      "assignees": [
        {
          "_id": "609c1cc2b1f95d001e09cbc0",
          "name": "Alice",
          "email": "alice@example.com"
        }
      ]
    },
    {
      "_id": "609c1cc2b1f95d001e09cbc4",
      "title": "Task 2",
      "description": "Review task 2",
      "status": "done",
      "project": {
        "_id": "609c1cc2b1f95d001e09cbbe",
        "name": "Project A"
      },
      "assignees": [
        {
          "_id": "609c1cc2b1f95d001e09cbc1",
          "name": "Bob",
          "email": "bob@example.com"
        }
      ]
    }
  ]
  ```

#### GET `/api/tasks/:id`
- Description: Fetch task by ID
- Example Response:
  ```json
  {
    "_id": "609c1cc2b1f95d001e09cbc3",
    "title": "Task 1",
    "description": "Complete task 1",
    "status": "pending",
    "project": {
      "_id": "609c1cc2b1f95d001e09cbbe",
      "name": "Project A"
    },
    "assignees": [
      {
        "_id": "609c1cc2b1f95d001e09cbc0",
        "name": "Alice",
        "email": "alice@example.com"
      }
    ]
  }
  ```

#### POST `/api/tasks`
- Description: Create a new task
- Example Request Body:
  ```json
  {
    "title": "New Task",
    "description": "This is a new task",
    "project": "609c1cc2b1f95d001e09cbbe",
    "assignees": ["609c1cc2b1f95d001e09cbc0"]
  }
  ```
- Example Response:
  ```json
  {
    "_id": "609c1cc2b1f95d001e09cbc8",
    "title": "New Task",
    "description": "This is a new task",
    "status": "pending",
    "project": {
      "_id": "609c1cc2b1f95d001e09cbbe",
      "name": "Project A"
    },
    "assignees": [
      {
        "_id": "609c1cc2b1f95d001e09cbc0",
        "name": "Alice",
        "email": "alice@example.com"
      }
    ]
  }
  ```

#### PUT `/api/tasks/:id`
- Description: Update task by ID
- Example Request Body:
 

 ```json
  {
    "status": "done"
  }
  ```
- Example Response:
  ```json
  {
    "_id": "609c1cc2b1f95d001e09cbc3",
    "title": "Task 1",
    "description": "Complete task 1",
    "status": "done",
    "project": {
      "_id": "609c1cc2b1f95d001e09cbbe",
      "name": "Project A"
    },
    "assignees": [
      {
        "_id": "609c1cc2b1f95d001e09cbc0",
        "name": "Alice",
        "email": "alice@example.com"
      }
    ]
  }
  ```

#### DELETE `/api/tasks/:id`
- Description: Delete task by ID
- Example Response:
  ```json
  {
    "message": "Task deleted successfully!"
  }
  ```

### Attendance Routes

#### POST `/api/attendance/checkin`
- Description: Check-in for the day
- Example Request Body: (No request body needed)
- Example Response:
  ```json
  {
    "message": "Check-in successful!"
  }
  ```

#### POST `/api/attendance/checkout`
- Description: Check-out for the day
- Example Request Body: (No request body needed)
- Example Response:
  ```json
  {
    "message": "Check-out successful!"
  }
  ```

#### GET `/api/attendance/late?date=YYYY-MM-DD`
- Description: Get late attendances for a specific date
- Example Response:
  ```json
  [
    {
      "_id": "609c1cc2b1f95d001e09cbcf",
      "user": {
        "_id": "609c1cc2b1f95d001e09cbc0",
        "name": "Alice",
        "email": "alice@example.com"
      },
      "date": "2023-05-14T00:00:00.000Z",
      "checkIn": "2023-05-14T09:10:00.000Z",
      "checkOut": "2023-05-14T17:30:00.000Z",
      "status": "late"
    }
  ]
  ```

#### GET `/api/attendance/report/:userId`
- Description: Get attendance report for a user in the last 60 days
- Example Response:
  ```json
  [
    {
      "_id": "609c1cc2b1f95d001e09cbcf",
      "user": {
        "_id": "609c1cc2b1f95d001e09cbc0",
        "name": "Alice",
        "email": "alice@example.com"
      },
      "date": "2023-05-14T00:00:00.000Z",
      "checkIn": "2023-05-14T09:10:00.000Z",
      "checkOut": "2023-05-14T17:30:00.000Z",
      "status": "late"
    }
  ]
  ```

#### PUT `/api/attendance/:id/status`
- Description: Update attendance status by ID
- Example Request Body:
  ```json
  {
    "status": "in_time"
  }
  ```
- Example Response:
  ```json
  {
    "message": "Attendance status updated successfully!"
  }
  ```

### Settings Routes

#### PUT `/api/settings`
- Description: Update a setting by key
- Example Request Body:
  ```json
  {
    "key": "checkInTime",
    "value": "09:00"
  }
  ```
- Example Response:
  ```json
  {
    "message": "Setting updated successfully!"
  }
  ```

#### GET `/api/settings`
- Description: Fetch all settings
- Example Response:
  ```json
  [
    {
      "_id": "609c1cc2b1f95d001e09cbda",
      "key": "checkInTime",
      "value": "09:00"
    },
    {
      "_id": "609c1cc2b1f95d001e09cbdb",
      "key": "checkOutTime",
      "value": "18:00"
    }
  ]
  ```