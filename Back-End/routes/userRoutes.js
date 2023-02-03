import  express  from "express";
import  {addUser, deleteAllUsers, deleteUser, forgotPassword, getUserById, getUsers, login, resetPassword, updateUser}  from "../controllers/userControllers.js"
import {isAuth} from "../middlewares/auth.js"
import { checkRole } from "../middlewares/checkRole.js";
const router = express.Router();

// Route for verfiy user
// router.post('/users/verifyuser/:activationCode', verifyUser)

// Route for login
router.post('/users/login', login)

// Route for forgot password
router.post('/users/forgetPassword', forgotPassword)

// Route for reset the password
router.post('/users/requestPasswordReset/:id/:token' , resetPassword)

// Route for the display all users
router.get('/users', isAuth,
(req, res, next)=> checkRole(["super admin"], req, res, next), getUsers)

// route for displaying the information of a user whose identifier is known
router.get('/users/:id', isAuth,
(req, res, next)=> checkRole(["super admin"], req, res, next), getUserById)

// Route for added a new user
router.post('/users/createNewUser', isAuth,
                                    (req, res, next)=> checkRole(["super admin"], req, res, next),
                                    addUser)                        

// Route for deletion of a well-defined user
router.delete('/users/delete/:id',isAuth,(req, res, next)=> checkRole(["super admin"], req, res, next),
                                    deleteUser)

// Route for delete all users
router.delete('/users/deleteAll', isAuth,(req, res, next)=> checkRole(["super admin"], req, res, next),
                                deleteAllUsers)

// Updating a user for which the identifier is known
router.put('/users/update/:id', isAuth, updateUser)


export default router;











// send req days off
// router.post('/users', isAuth,
// (req, res, next)=> checkRole(["user"], req, res, next), sendDaysOff)

// display req of a well-defined request daysOff
// router.get('/daysOff/:id', isAuth,
// (req, res, next)=> checkRole(["director", "manager"], req, res, next), getDaysOff)

// displayy all req daysOff(director, manager)
// router.get('/daysOff', isAuth,
// (req, res, next)=> checkRole(["director", "manager"], req, res, next), getDaysOff)


// router.post('/users/:id', isAuth,
// (req, res, next)=> checkRole(["director", "manager"], req, res, next), reponseDaysOff)

// router.get('/users', isAuth,
// (req, res, next)=> checkRole(["user"], req, res, next), getDaysOff)