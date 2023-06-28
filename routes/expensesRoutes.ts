import { router } from "../routes/index";
const expensesController = require("../controllers/expensesController");

const methodOverride = require("method-override");
router.use(methodOverride("_method", {
methods: ["POST", "GET"]
}));

router.get("/expenses",expensesController.index, expensesController.indexView);
router.get("/expenses/new", expensesController.new);
router.post("/expenses/create", expensesController.create, expensesController.redirectView);
router.get("/expenses/:id/edit", expensesController.edit);
router.put("/expenses/:id/update", expensesController.update, expensesController.redirectView);
router.get("/expenses/:id", expensesController.show, expensesController.showView);
router.delete("/expenses/:id/delete", expensesController.delete, expensesController.redirectView);

module.exports = router;