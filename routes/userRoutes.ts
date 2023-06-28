import { router } from "../routes/index";
const userController = require("../controllers/userController");

router.get("/users", userController.index, userController.indexView);

router.get("/users/new", userController.new);
router.post("/users/create", userController.validate ,userController.create, userController.redirectView);

router.get("/users/login", userController.login);
router.post("/users/login", userController.authenticate);

router.get("/user/:id", userController.show, userController.showView);

module.exports = router;