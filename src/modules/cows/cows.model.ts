import { Schema, model } from 'mongoose'
import { CowModel, ICow } from './cows.interface'
import { Breed, Category, Label, Locations } from './cows.constants'

const cowSchema = new Schema<ICow>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      enum: Object.values(Label),
      default: Label.for_sale,
    },
    category: {
      type: String,
      required: true,
      enum: Object.values(Category),
    },
    location: {
      type: String,
      required: true,
      enum: Locations,
    },
    breed: {
      type: String,
      required: true,
      enum: Object.values(Breed),
    },
    weight: {
      type: String,
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  {
    timestamps: true,
  }
)
export const Cow = model<ICow, CowModel>('Cow', cowSchema)
