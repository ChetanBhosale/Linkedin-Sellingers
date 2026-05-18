import { Router } from 'express'
import { googleLogin, googleCallback } from '../controller/auth.controller'

const router = Router()

router.get('/google', googleLogin)
router.get('/google/callback', googleCallback)

export default router
