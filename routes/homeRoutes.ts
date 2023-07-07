import { router } from "../routes/index";
const homeController = require("../controllers/homeController");

router.get('/', homeController.showHome);
router.get('/talkTo', homeController.chat);

module.exports = router;