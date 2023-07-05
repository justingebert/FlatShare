import { appendFile } from "fs";

const router = require("express").Router();
const todoController = require("../controllers/todoController");
const userController = require("../controllers/userController");

router.get("/todos", todoController.index, todoController.filterUserTodos ,todoController.respondJSON);
router.post("/login", userController.apiAuthenticate);
router.use(userController.verifyJWT);
router.use(todoController.errorJSON);

module.exports = router;