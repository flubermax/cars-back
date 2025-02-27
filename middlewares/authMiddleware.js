import jwt from 'jsonwebtoken'
import {SECRET_KEY} from '../config.js'

export default (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(403).json({message: 'Ошибка авторизации'})
    }
    const decodedData = jwt.verify(token, SECRET_KEY)
    req.user = decodedData
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.json({
        success: false,
        message: `jwt expired`,
        token: null,
        user: null
      })
    } else {
      return res.status(403).json({message: 'Ошибка авторизации'})
    }
  }
}