import { Router } from "express";
export const router = Router();


const shoppingRoutes = require("./shoppingRoutes");
const documentsRoutes = require("./documentsRoutes");
const homeRoutes = require("./homeRoutes");
const userRoutes = require("./userRoutes");
const expensesRoutes = require("./expensesRoutes");
const todoRoutes = require("./todoRoutes");
const apiRoutes = require("./apiRoutes");

router.use("/api", apiRoutes);
/*
router.use("/", homeRoutes);
router.use("/shopping", shoppingRoutes);
router.use("/documents", shoppingRoutes);
*/

module.exports = router;