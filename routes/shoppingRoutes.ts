import { router } from "../routes/index";
const shoppingController = require("../controllers/shoppingController");

router.get("/shopping/", shoppingController.index, shoppingController.indexView);
router.get("/shopping/new", shoppingController.new);
router.post("/shopping/create", shoppingController.create, shoppingController.redirectView);
router.get("/shopping/:id", shoppingController.show, shoppingController.showView);
router.get("/shopping/:id/edit", shoppingController.edit); 
router.post("/shopping/:id/update", shoppingController.update, shoppingController.redirectView);
router.get("/shopping/:id/delete", shoppingController.delete, shoppingController.redirectView); 

module.exports = router;