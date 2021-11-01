1. "npm install"
2. Start project "npm start" or "npm run dev"

##EndPoints
http://localhost:5000/task/all Get all tasks

http://localhost:5000/task/create Create task

http://localhost:5000/task/create-subtask/:taskID Create a subtask for task with id: taskID

http://localhost:5000/task/update/:taskID Update a task with id: taskID

http://localhost:5000/task/delete/:taskID Delete a task with id: taskID(also delete all subtasks)
