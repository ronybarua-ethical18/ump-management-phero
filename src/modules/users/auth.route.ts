import express from 'express'
import usersController from './users.controller'
import { UserValidation } from './users.validation'
import validateRequest from '../../middlewares/validateRequest'
const router = express.Router()

router.post(
  '/signup',
  validateRequest(UserValidation.createUserZodSchema),
  usersController.createUser
)

export default router
