const Task = require("../models/Task");

const getAll = async (req, res) => {
  try {
    const tasks = await Task.find().populate("subtasks");
    return res.status(200).send(tasks);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createTask = async (taskBody) => {
  const task = new Task({ ...taskBody, subtasks: [] });
  await task.save();
  return task;
};

const postTask = async (req, res) => {
  try {
    const task = await createTask(req.body);
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createSubTask = async (req, res) => {
  try {
    const { taskID } = req.params;
    const subtask = await createTask({ ...req.body, mainTask: taskID });

    await Task.findByIdAndUpdate(subtask.mainTask, {
      $push: {
        subtasks: subtask.id,
      },
    });
    res.status(201).json({ message: "Task created successfully", subtask });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createRandom = async (req, res) => {
  try {
    let taskID = null;
    const count = 1000;
    for (let i = 1; i <= count; i++) {
      const data = {
        taskName: "Task #" + i,
        startDate: new Date("02/03/2017"),
        endDate: new Date("02/07/2017"),
        duration: Math.ceil(Math.random() * 10),
        progress: Math.ceil(Math.random() * 100),
        priority: "Normal",
        approved: false,
      };
      if (i % 5 === 1) {
        const task = await createTask(data);
        taskID = task._id;
      } else {
        const subtask = await createTask({ ...data, mainTask: taskID });
        await Task.findByIdAndUpdate(subtask.mainTask, {
          $push: {
            subtasks: subtask.id,
          },
        });
      }
    }
    res.status(200).send("Created");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateTask = async (req, res) => {
  try {
    const { taskID } = req.params;
    const taskBody = req.body;

    const task = await Task.findByIdAndUpdate(taskID, taskBody, {
      new: true,
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({
      message: "Task Updated",
      task,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { taskID } = req.params;
    const task = await Task.findById(taskID);
    if (!task) return res.status(404).send("Task not found");
    for (const subtask of task.subtasks) {
      await Task.findByIdAndDelete(subtask);
    }
    await Task.deleteOne({ _id: taskID });

    await Task.findByIdAndUpdate(task.mainTask, {
      $pull: {
        subtasks: taskID,
      },
    });

    res.status(200).send("Task deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAll,
  postTask,
  updateTask,
  deleteTask,
  createSubTask,
  createRandom,
};
