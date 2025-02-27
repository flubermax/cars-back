import mongoose from 'mongoose'

// const CarProp = new mongoose.Schema({
//   type: String,
//   name: String
// })

// const Author = new mongoose.Schema({
//   name: String,
//   avatar: String,
//   phone: String,
//   location: String
// })

const Car = new mongoose.Schema({
  idf: String,
  images: [{
    type: String
  }],
  brand: {type: String, required: true},
  model: {type: String, required: true},
  color: {type: String},
  engineType: String,
  engineCapacity: {type: Number},
  drive: String,
  enginePower: {type: Number},
  transmission: String,
  leftHandDrive: {type: Boolean},
  year: {type: Number},
  mileage: {type: Number},
  price: {type: Number, required: true},
  descr: {type: String},
  authorIdf: String,
  authorName: String,
  authorAvatar: String,
  authorPhone: String,
  authorLocation: String,
})

export default mongoose.model('Car', Car)