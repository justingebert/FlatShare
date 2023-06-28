import { router } from "../routes/index";
const todoController = require("../controllers/todoController");


router.get("/todos", todoController.index, todoController.indexView);
router.post("/todos", todoController.create, todoController.redirectView);

module.exports = router;