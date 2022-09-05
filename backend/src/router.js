// router.js = vue (mvc)
const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");
const todoControllers = require("./controllers/todoControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

router.get("/todos", todoControllers.getTodos);
router.post("/todos", todoControllers.postTodos);
router.put("/todos/:id", todoControllers.updateTodos); // ou router.put("/todos", todoControllers.updateTodos);
router.delete("/todos/:id", todoControllers.deleteTodos); // ou router.delete("/todos", todoControllers.deleteTodos);

module.exports = router;
