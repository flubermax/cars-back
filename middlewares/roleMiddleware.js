import jwt from 'jsonwebtoken'
import {SECRET_KEY} from '../config.js'

export default (roles) => {
  return function(req, res, next) {
    if (req.method === 'OPTIONS') {
      next()
    }

    try {
      const token = req.headers.authorization.split(' ')[1]
      if (!token) {
        return res.status(403).json({message: 'Пользователь не авторизован'})
      }
      const {roles: userRoles} = jwt.verify(token, SECRET_KEY)
      let hasRole = false
      userRoles.forEach(role => {
        if (roles.includes(role)) {
          hasRole = true
        }
      })
      if (!hasRole) {
        return res.status(403).json({message: 'У вас нет доступа к списку пользователей'})
      }
      next()
    } catch (error) {
      console.log(error)
      return res.status(403).json({message: 'Ошибка при получении списка'})
    }
  }
}