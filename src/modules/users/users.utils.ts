import { User } from './users.model'

export const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()

  return lastUser?.id
}

export const generateUserId = async () => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0') //00000
  //increment by 1
  let normalize_id = currentId
  if (currentId.includes('S') || currentId.includes('B')) {
    normalize_id = currentId.split('-')[1]
  }
  const incrementId = (parseInt(normalize_id) + 1).toString().padStart(5, '0')
  return incrementId
}
