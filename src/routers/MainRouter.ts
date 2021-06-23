import express from "express"
import AuthController from "../controllers/AuthController"
import CoachRouter from "../routers/CoachRouter"
import RequestRouter from "../routers/RequestRouter"

const router=express.Router()

router.post('/login',AuthController.login)
router.post('/signup',AuthController.signup)

router.use('/api/v1/coaches',CoachRouter)
router.use('/api/v1/requests',RequestRouter)



export default router