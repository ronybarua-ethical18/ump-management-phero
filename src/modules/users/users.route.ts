import express from 'express'
import usersController from './users.controller'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidation } from './users.validation'
const router = express.Router()

router.get('/', usersController.getAllUsers)
router.get('/:id', usersController.getSingleUser)
router.patch(
  '/:id',
  validateRequest(UserValidation.updateUserZodSchema),
  usersController.updateUser
)
router.delete('/:id', usersController.deleteUser)

export default router
