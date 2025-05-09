import { Router } from "express"
import { viewHistoricalPage } from "../controllers/historical.controller.js"

const router = Router()

router.get('/historical', viewHistoricalPage)


export default router