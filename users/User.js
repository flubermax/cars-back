import {Schema, model} from 'mongoose'

const User = new Schema({
  login: { type: String, unique: true, required: true },
  password: {type: String, required: true},
  name: String,
  location: String,
  avatar: String,
  phone: String,
  favorites: [String],
  roles: [{type: String, ref: 'Role'}]
})

export default model('User', User)