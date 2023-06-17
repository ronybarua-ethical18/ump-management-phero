import { Request, Response } from 'express'
import httpStatus from 'http-status'
import cowService from './cows.service'
import sendResponse from '../../shared/sendResponse'
import catchAsync from '../../shared/catchAsync'
import { ICow } from './cows.interface'
import mongoose from 'mongoose'

const createCow = catchAsync(async (req: Request, res: Response) => {
  const cow = await cowService.createCow(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow created successfully',
    data: cow,
  })
})

const getAllCows = catchAsync(async (req: Request, res: Response) => {
  const cows = await cowService.getAllCows()

  sendResponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `All cow fetched successfully`,
    data: cows,
  })
})

const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params.id === 'string') {
    const cow = await cowService.getSingleCow(
      new mongoose.Types.ObjectId(req.params.id)
    )
    sendResponse<ICow>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Cow fetched successfully`,
      data: cow,
    })
  }
})

const updateCow = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params.id === 'string') {
    const cow = await cowService.updateCow(
      new mongoose.Types.ObjectId(req.params.id),
      req.body
    )
    sendResponse<ICow>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Cow updated successfully`,
      data: cow,
    })
  }
})

const deleteCow = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params.id === 'string') {
    const cow = await cowService.deleteCow(
      new mongoose.Types.ObjectId(req.params.id)
    )
    sendResponse<ICow>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Cow deleted successfully`,
      data: cow,
    })
  }
})
export default {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
}
