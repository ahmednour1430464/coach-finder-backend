import express from "express";
import Request from "../controllers/RequestController";
import cors from "../services/CorsService";

const router=express.Router()



router.get('/:id',Request.getOne)
router.get('/user/:id',Request.getAll)
router.get('/',Request.getAllRe)
router.post('/create',Request.create)


export default router



