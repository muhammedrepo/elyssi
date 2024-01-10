import User from '@/models/User'
import db from '@/utils/db'
import bcryptjs from 'bcryptjs'
import { getToken } from 'next-auth/jwt'

async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res
      .status(405)
      .json({ message: `Method ${req.method} is not allowed` })
  }

  const user = await getToken({ req })
  if (!user) {
    return res.status(401).json({ message: 'Authentication required' })
  }

  const { firstName, lastName, email, password } = req.body

  if (
    !firstName ||
    !lastName ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 5
  ) {
    return res
      .status(422)
      .json({ message: 'Invalid input - please check your data' })
  }

  await db.connect()
  const toUpdateUser = await User.findById(user._id)
  toUpdateUser.firstName = firstName
  toUpdateUser.lastName = lastName
  toUpdateUser.email = email

  if (password) {
    toUpdateUser.password = bcryptjs.hashSync(password, 10)
  }

  await toUpdateUser.save()
  await db.disconnect()
  res.send({
    message: 'User updated successfully',
  })
}

export default handler
