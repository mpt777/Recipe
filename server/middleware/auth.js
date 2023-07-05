import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  console.log(req.headers)

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}

export function generateAccessToken(username) {
    console.log();
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

