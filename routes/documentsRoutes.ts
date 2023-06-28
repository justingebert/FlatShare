import { router } from "../routes/index";
const documentsController = require("../controllers/documentsController");

router.get("/documents", documentsController.index, documentsController.indexView);
router.get("/documents/new", documentsController.new);
router.post("/documents/create", documentsController.create, documentsController.redirectView);
router.put("/documents/:id/update", documentsController.update, documentsController.redirectView);
router.get("/documents/:id", documentsController.show, documentsController.showView);
router.delete("/documents/:id/delete", documentsController.delete, documentsController.redirectView);

module.exports = router;