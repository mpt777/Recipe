import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    
    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}

export function generateAccessToken(user) {
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

