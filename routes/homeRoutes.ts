import { router } from "../routes/index";
const homeController = require("../controllers/homeController");

router.get('/', homeController.showHome);

module.exports = router;