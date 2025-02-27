import UserService from './UserService.js'
import Role from '../roles/Role.js'
import { validationResult } from 'express-validator'

// res.writeHead(200, {
//   'Content-Type': 'application/json',
//   'Access-Control-Allow-Origin': '*'
// })header('Access-Control-Allow-Origin: *')

class UserController {
  async registerUser(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const msgArray = []
      let msgString
      errors.errors.forEach(err => {
        msgArray.push(err.msg)
      })
      if (msgArray.length > 1) {
        msgString = msgArray.join('; ')
      } else {
        msgString = msgArray.join('')
      }
      return res.status(200).json({
        success: false,
        message: msgString,
        data: errors
      })
    }
    try {
      const result = await UserService.registerUser(req.body)
      res.json(result)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async loginUser(req, res) {
    try {
      const result = await UserService.loginUser(req.body)
      res.json(result)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async auth(req, res) {
    try {
      const result = await UserService.auth(req)
      res.json(result)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async getAllUsers(req, res) {
    try {
      // const userRole = new Role()
      // const adminRole = new Role({value: 'ADMIN'})
      // await userRole.save()
      // await adminRole.save()
      const users = await UserService.getAllUsers()
      return res.json(users)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params
      const response = await UserService.getUserById(id)
      return res.json(response)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }

  async updateUserProfile(req, res) {
    try {
      console.log(req.files.avatarFile)
      const user = req.body
      const file = req?.files?.avatarFile ? req.files.avatarFile : null
      const result = await UserService.updateUserProfile(user, file)
      return res.json(result)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }

  async updateUserPassword(req, res) {
    try {
      const user = req.body
      const result = await UserService.updateUserPassword(user)
      return res.json(result)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }

  async deleteUser(req, res) {
    try {
      const {id} = req.params
      const result = await UserService.deleteUser(id)
      return res.json(result)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }

  async addToFav(req, res) {
    try {
      const {userIdf, carIdf} = req.body
      const result = await UserService.addToFav(userIdf, carIdf)
      return res.json(result)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }
}

export default new UserController()