// import config from '../../config'
// import config from '../../config'
import mongoose from 'mongoose'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generateUserId } from './users.utils'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'

// create new user
const createUser = async (user: IUser): Promise<IUser | null> => {
  const id = await generateUserId()

  if (user?.role === 'buyer') {
    user.id = `B-${id}`
  }
  if (user?.role === 'seller') {
    user.id = `S-${id}`
  }

  const createdUser = await User.create(user)

  if (!createUser) {
    throw new Error('Failed to create user!')
  }
  return createdUser
}

// get all users from db
const getAllUsers = async (): Promise<IUser[] | []> => {
  const users = await User.find({})
  return users || []
}

// get a single user
const getSingleUser = async (
  userId: mongoose.Types.ObjectId
): Promise<IUser> => {
  const user = await User.findById({ _id: userId })

  if (user) {
    return user
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
}

// update a single user
const updateUser = async (
  userId: mongoose.Types.ObjectId,
  updatePayload: IUser
): Promise<IUser | null> => {
  const user = await User.findById({ _id: userId })

  if (user) {
    const updateUser = await User.findByIdAndUpdate(
      { _id: userId },
      { ...updatePayload },
      { new: true }
    )
    return updateUser
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
}

// delete a single user
const deleteUser = async (
  userId: mongoose.Types.ObjectId
): Promise<IUser | null> => {
  const user = await User.findById({ _id: userId })

  if (user) {
    const deletedUser = await User.findByIdAndDelete({ _id: userId })
    return deletedUser
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
}

export default {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
}
