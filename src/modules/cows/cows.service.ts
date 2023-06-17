import httpStatus from 'http-status'
import ApiError from '../../errors/ApiError'
import { ICow } from './cows.interface'
import { Cow } from './cows.model'
import mongoose from 'mongoose'

// create a new cow
const createCow = async (cowInfo: ICow): Promise<ICow | null> => {
  const cow = await Cow.create(cowInfo)
  if (!cow) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Cow data creation failed')
  }
  return cow
}

// get all cows from db
const getAllCows = async (): Promise<ICow[] | []> => {
  const cows = await Cow.find({})
  return cows || []
}

// get a single cow
const getSingleCow = async (cowId: mongoose.Types.ObjectId): Promise<ICow> => {
  const cow = await Cow.findById({ _id: cowId })

  if (cow) {
    return cow
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow not found')
  }
}

// update a single cow
const updateCow = async (
  cowId: mongoose.Types.ObjectId,
  updatePayload: ICow
): Promise<ICow | null> => {
  const cow = await Cow.findById({ _id: cowId })

  if (cow) {
    const updatedCow = await Cow.findByIdAndUpdate(
      { _id: cowId },
      { ...updatePayload },
      { new: true }
    )
    return updatedCow
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow not found')
  }
}

// delete a single cow
const deleteCow = async (
  cowId: mongoose.Types.ObjectId
): Promise<ICow | null> => {
  const cow = await Cow.findById({ _id: cowId })

  if (cow) {
    const deletedCow = await Cow.findByIdAndDelete({ _id: cowId })
    return deletedCow
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow not found')
  }
}

export default {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
}
