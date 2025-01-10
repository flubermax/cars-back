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
      return res.status(400).json({message: 'Ошибка при регистрации', value: errors})
    }
    try {
      const data = await UserService.registerUser(req.body)
      res.json(data)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async loginUser(req, res) {
    try {
      const data = await UserService.loginUser(req.body)
      res.json(data)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async getAllUsers(req, res) {
    try {
      const userRole = new Role()
      const adminRole = new Role({value: 'ADMIN'})
      await userRole.save()
      await adminRole.save()
      const users = await UserService.getAllUsers()
      return res.json(users)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params
      const user = await UserService.getUserById(id)
      return res.json(user)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }

  async updateUser(req, res) {
    try {
      const user = req.body
      const file = req?.files?.avatarFile ? req.files.avatarFile : null
      const updatedUser = await UserService.updateUser(user, file)
      return res.json(updatedUser)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }

  async deleteUser(req, res) {
    try {
      const {id} = req.params
      const deletedUser = await UserService.deleteUser(id)
      return res.json(deletedUser)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }
}

export default new UserController()