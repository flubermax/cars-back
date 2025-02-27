import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from './User.js'
import FileService from '../FileService.js'
import Role from '../roles/Role.js'
import {SECRET_KEY} from '../config.js'
import {idfGenerator} from '../utils/idfGenerator.js'

const generateAccessToken = (id, roles) => {
  const payload = {
    id, roles
  }
  return jwt.sign(payload, SECRET_KEY, {expiresIn: 3000})
}

const getUserData = (user) => {
  return {
    idf: user.idf,
    login: user.login,
    name: user.name,
    location: user.location,
    avatar: user.avatar,
    phone: user.phone,
    favorites: user.favorites,
    roles: user.roles
  }
}
class UserService {
  async registerUser(user) {
    const existingUser = await User.findOne({login: user.login })
    if (existingUser) {
      return {
        success: false,
        message: `Пользователь с логином "${existingUser.login}" уже существует`,
        data: null
      }
    }
    const hashPassword = bcrypt.hashSync(user.password, 5)
    const userRole = await Role.findOne({value: 'USER'})
    const newUser = await User.create({...user, password: hashPassword, idf: idfGenerator(), roles: [userRole.value]})
    return {
      success: true,
      message: 'Регистрация прошла успешно',
      data: getUserData(newUser)
    }
  }

  async loginUser(data) {
    const {login, password} = data
    const user = await User.findOne({login})
    if (!user) {
      return {
        success: false,
        message: `Пользователь с ником "${login}" не найден`,
        data: null
      }
    }
    const validPassword = bcrypt.compareSync(password, user.password)
    if (!validPassword) {
      return {
        success: false,
        message: `Введён неверный пароль`,
        data: null
      }
    }
    const token = generateAccessToken(user._id, user.roles)
    return {
      success: true,
      message: `Авторизация прошла успешно`,
      token,
      user: getUserData(user)
    }
  }

  async auth(data) {
    const user = await User.findOne({_id: data.user.id})
    const token = generateAccessToken(user._id, user.roles)
    return {
      success: true,
      message: `Авторизация прошла успешно`,
      token,
      user: getUserData(user)
    }
  }

  async getAllUsers() {
    const users = await User.find()
    return {
      success: true,
      message: '',
      data: users
    }
  }

  async getUserById(id) {
    if (!id) {
      throw new Error('ID не указан')
    }
    const user = await User.findById(id)
    if (user) {
      return {
        success: true,
        message: '',
        data: getUserData(user)
      }
    } else {
      return {
        success: true,
        message: 'Пользователь не найден',
        data: null
      }
    }
  }

  async updateUserProfile(user, avatarFile) {
    const userForUpdate = await User.findOne({login: user.login})
    if (userForUpdate.login === user.login && userForUpdate.idf !== user.idf) {
      return {
        success: false,
        message: `Пользователь с ником "${user.login}" уже существует`,
        data: null
      }
    }
    if (userForUpdate.avatar && (user.avatar !== userForUpdate.avatar)) {
      FileService.deleteUserFile(userForUpdate.avatar)
    }
    const fileName = avatarFile ? FileService.saveUserFile(avatarFile) : user.avatar
    const updatedUser = await User.findByIdAndUpdate(userForUpdate._id, {...user, avatar: fileName}, {new: true})
    return {
      success: true,
      message: 'Данные профиля успешно обновлены',
      data: getUserData(updatedUser)
    }
  }

  async updateUserPassword(user) {
    const userForUpdate = await User.findOne({login: user.login})
    const hashPassword = bcrypt.hashSync(user.newPassword, 5)
    const updatedUser = await User.findByIdAndUpdate(userForUpdate._id, {...user, password: hashPassword}, {new: true})
    return {
      success: true,
      message: 'Пароль успешно обновлен',
      data: getUserData(updatedUser)
    }
  }

  async deleteUser(id) {
    if (!id) {
      throw new Error('ID не указан')
    }
    const deletedUser = await User.findByIdAndDelete(id)
    return {
      success: true,
      message: 'Пользователь успешно удалён',
      data: getUserData(deletedUser)
    }
  }

  // "$set": { "name": "foo" }
  async addToFav(userIdf, carIdf) {
    const userForUpdate = await User.findOne({idf: userIdf})
    if (userForUpdate.favorites.includes(carIdf)) {
      const updatedUser = await User.findOneAndUpdate({idf: userIdf}, {$pull: { favorites: carIdf }}, {new: true})
      return {
        success: true,
        message: 'Автомобиль удален из избранного',
        data: getUserData(updatedUser)
      }
    } else {
      const updatedUser = await User.findOneAndUpdate({idf: userIdf}, {$push: { favorites: carIdf }}, {new: true})
      return {
        success: true,
        message: 'Автомобиль добавлен в избранное',
        data: getUserData(updatedUser)
      }
    }
  }
}

export default new UserService()