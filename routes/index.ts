import { Router } from "express";
export const router = Router();


const shoppingRoutes = require("./shoppingRoutes");
const documentsRoutes = require("./documentsRoutes");
const homeRoutes = require("./homeRoutes");
const userRoutes = require("./userRoutes");
const expensesRoutes = require("./expensesRoutes");


//router.use("/shopping", shoppingRoutes);

module.exports = router;