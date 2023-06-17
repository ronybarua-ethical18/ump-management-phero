import { Model } from 'mongoose'

export enum Role {
  seller = 'seller',
  buyer = 'buyer',
}

export type IUser = {
  id: string
  role: Role
  password: string
  phoneNumber: string
  name: {
    firstName: string
    lastName: string
  }
  address: string
  budget?: number
  income?: number
}

export type UserModel = Model<IUser>
