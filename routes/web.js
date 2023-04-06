import express from 'express'

import UserController from '../controllers/UserController.js'

import isValidUser from '../middlewares/middleware.js'

const router = express.Router()


router.get('/signup',UserController.signUp_get)

router.get('/login',UserController.login_get)

router.get('/dashboard',isValidUser,UserController.dashboard_get)

router.get('/',UserController.landing_get)

// post routes

router.post('/signup',UserController.signUp_post)

router.post('/login',UserController.login_post)

router.post('/logout',UserController.logout_post_dashboard)

export default router