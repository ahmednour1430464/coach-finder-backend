import express from "express";
import Coach from "../controllers/CoachController";
import cors from "../services/CorsService";
const router=express.Router()



router.get('/:id',Coach.getOne)
router.get('/',Coach.getAll)
router.post('/create',Coach.create)

// router.options('/create',(req,res,next)=>{
//     cors(res).sendStatus(204)
// })

export default router



