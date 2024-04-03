import schoolController from "../controller/schoolController.js";
import  Router  from "express";
import student from "../controller/studentController.js";
import studentMiddleware from "../middleware/rolemiddleware.js";
const router = Router()

router.post('/add',schoolController.signup)
router.post('/login',schoolController.login)
router.post('/addstudent',studentMiddleware,student.creating)


export default router