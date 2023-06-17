import { Model, Types } from 'mongoose'
import { Breed, Category, Label, Locations } from './cows.constants'

export type ICow = {
  name: string
  age: number
  price: number
  location: Locations
  breed: Breed
  weight: string
  label: Label
  category: Category
  seller: Types.ObjectId
}

export type CowModel = Model<ICow>
