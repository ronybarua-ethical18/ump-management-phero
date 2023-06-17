import { z } from 'zod'

const createCowZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is required',
    }),
    price: z.number({
      required_error: 'price is required',
    }),
    age: z.number().optional(),
    location: z.string({
      required_error: 'location is required',
    }),
    label: z.string({ required_error: 'label is required' }),
    category: z.string({ required_error: 'category is required' }),
    breed: z.string({ required_error: 'breed is required' }),
    weight: z.string({ required_error: 'weight is required' }),
  }),
})

const updateCowZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    price: z.number().optional(),
    age: z.number().optional(),
    location: z.string().optional(),
    label: z.string().optional(),
    category: z.string().optional(),
    breed: z.string().optional(),
    weight: z.string().optional(),
  }),
})

export const CowValidation = {
  createCowZodSchema,
  updateCowZodSchema,
}
