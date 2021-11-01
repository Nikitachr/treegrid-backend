const { Router } = require("express");
const {
  getAll,
  postTask,
  createSubTask,
  updateTask,
  deleteTask,
  createRandom
} = require("../controllers/TaskController");

const router = new Router();

router.get("/all", getAll);
router.post("/create", postTask);
router.post("/create-all", createRandom);
router.post("/create-subtask/:taskID", createSubTask);
router.put("/update/:taskID", updateTask);
router.delete("/delete/:taskID", deleteTask);

module.exports = router;
