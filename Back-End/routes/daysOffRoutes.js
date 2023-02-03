import  express  from "express";
import { addDaysOff, deleteAllDaysOff, deleteDaysOff, getDaysOff, getDaysOffById } from "../controllers/daysOffControllers.js";
import { isAuth } from "../middlewares/auth.js"
import { checkRole } from "../middlewares/checkRole.js";

const router = express.Router();

router.get('/daysOff', isAuth, (req, res, next)=> checkRole(['super admin','Director', 'Administration Director', 'Administration Assistant', 'Team Manager', 'Software Enginner'], req, res, next),
getDaysOff)

router.get('/daysOff/:id', isAuth,(req, res, next)=> checkRole(['super admin','Director', 'Administration Director', 'Administration Assistant', 'Team Manager', 'Software Enginner'], req, res, next),
 getDaysOffById)

router.post("/addDaysOff/:id", isAuth,(req, res, next)=> checkRole(['super admin','Director', 'Administration Director', 'Administration Assistant', 'Team Manager', 'Software Enginner'], req, res, next),
 addDaysOff)

router.delete("/deleteDaysOff", isAuth,(req, res, next)=> checkRole(['super admin','Director', 'Administration Director', 'Administration Assistant', 'Team Manager', 'Software Enginner'], req, res, next),
deleteDaysOff)

router.delete("deleteAll", isAuth,(req, res, next)=> checkRole(['super admin','Director', 'Administration Director', 'Administration Assistant', 'Team Manager', 'Software Enginner'], req, res, next),
deleteAllDaysOff)


export default router;
