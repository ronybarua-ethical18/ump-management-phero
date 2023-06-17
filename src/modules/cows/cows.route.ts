import express from 'express'
import cow from './cows.controller'
import validateRequest from '../../middlewares/validateRequest'
import { CowValidation } from './cows.validation'
const router = express.Router()

router.post(
  '/',
  validateRequest(CowValidation.createCowZodSchema),
  cow.createCow
)
router.get('/', cow.getAllCows)
router.get('/:id', cow.getSingleCow)
router.patch(
  '/:id',
  validateRequest(CowValidation.updateCowZodSchema),
  cow.updateCow
)
router.delete('/:id', cow.deleteCow)

export default router
