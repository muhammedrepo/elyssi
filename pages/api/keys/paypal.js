const { getToken } = require('next-auth/jwt')

const handler = async (req, res) => {
  const user = await getToken({ req })
  if (!user) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
}

export default handler
