import { Request, Response } from 'express'
import httpStatus from 'http-status'
import usersService from './users.service'
import catchAsync from '../../shared/catchAsync'
import sendResponse from '../../shared/sendResponse'
import { IUser } from './users.interface'
import mongoose from 'mongoose'

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await usersService.createUser(req.body)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${
      req.body.role === 'seller'
        ? 'Seller profile is created successfully'
        : 'Buyer profile is created successfully'
    }`,
    data: result,
  })
})

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await usersService.getAllUsers()

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `All user fetched successfully`,
    data: users,
  })
})

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params.id === 'string') {
    const user = await usersService.getSingleUser(
      new mongoose.Types.ObjectId(req.params.id)
    )
    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `User fetched successfully`,
      data: user,
    })
  }
})

const updateUser = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params.id === 'string') {
    const user = await usersService.updateUser(
      new mongoose.Types.ObjectId(req.params.id),
      req.body
    )
    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `User updated successfully`,
      data: user,
    })
  }
})

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params.id === 'string') {
    const user = await usersService.deleteUser(
      new mongoose.Types.ObjectId(req.params.id)
    )
    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `User deleted successfully`,
      data: user,
    })
  }
})

export default {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
}
