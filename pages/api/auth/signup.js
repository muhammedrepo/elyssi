import User from '@/models/User'
import db from '@/utils/db'
import bcryptjs from 'bcryptjs'
async function handler(req, res) {
  if (req.method !== 'POST') {
    return
  }
  const { firstName, lastName, email, password } = req.body
  if (
    !email ||
    !email.includes('@') ||
    !firstName ||
    firstName.trim() === '' ||
    !lastName ||
    lastName.trim() === '' ||
    !password ||
    password.trim() === '' ||
    password.trim().length < 6
  ) {
    res.status(422).json({ message: 'Invalid input' })
    return
  }

  await db.connect()
  const existingUser = await User.findOne({ email: email })
  if (existingUser) {
    res.status(422).json({ message: 'User already exists' })
    await db.disconnect()
    return
  }

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: bcryptjs.hashSync(password),
    isAdmin: false,
  })

  const user = await newUser.save()
  await db.disconnect()
  res.status(201).json({
    message: 'User created',
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    isAdmin: user.isAdmin,
  })
}

export default handler
