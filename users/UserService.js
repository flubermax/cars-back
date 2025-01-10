import User from './User.js'
import FileService from '../FileService.js'
import bcrypt from 'bcrypt'
import Role from '../roles/Role.js'

class UserService {
  async registerUser(user) {
    const existingUser = await User.findOne({login: user.login })
    if (existingUser) {
      return {
        success: false,
        msg: 'Пользователь с таким логином уже существует',
        data: existingUser
      }
    }
    const hashPassword = bcrypt.hashSync(user.password, 5);
    const userRole = await Role.findOne({value: 'USER'})
    const addedUser = await User.create({...user, password: hashPassword, roles: [userRole.value]})
    return {
      success: true,
      msg: 'Пользователь успешно зарегистрирован',
      data: addedUser
    }
  }

  async loginUser(data) {
    const currentUser = await User.findOne({login: data.login, password: data.password})
    if (currentUser) {
      return {
        success: true,
        msg: 'Авторизация прошла успешно',
        data: currentUser
      }
    } else {
      return {
        success: false,
        msg: 'Неверный логин или пароль',
        data: null
      }
    }
  }

  async getAllUsers() {
    const users = await User.find()
    return {
      success: true,
      msg: '',
      data: users
    }
  }

  async getUserById(id) {
    if (!id) {
      throw new Error('ID не указан')
    }
    const user = await User.findById(id)
    return {
      success: true,
      msg: '',
      data: user
    }
  }

  async updateUser(user, avatarFile) {
    if (!user._id) {
      throw new Error('ID не указан')
    }
    const userForUpdate = await User.findById(user._id)
    if (userForUpdate.avatar && (user.avatar !== userForUpdate.avatar)) {
      FileService.deleteFile(userForUpdate.avatar)
    }
    const fileName = avatarFile ? FileService.saveFile(avatarFile) : user.avatar
    const updatedUser = await User.findByIdAndUpdate(user._id, {...user, avatar: fileName}, {new: true})
    return {
      success: true,
      msg: 'Данные успешно обновлены',
      data: updatedUser
    }
  }

  async deleteUser(id) {
    if (!id) {
      throw new Error('ID не указан')
    }
    const deletedUser = await User.findByIdAndDelete(id)
    return {
      success: true,
      msg: 'Пользователь успешно удалён',
      data: null
    }
  }
}

export default new UserService()