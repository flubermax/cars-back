import mongoose from 'mongoose'

const CarProp = new mongoose.Schema({
  type: String,
  name: String
})

const Car = new mongoose.Schema({
  img: {type: String, required: true},
  brand: {type: String, required: true},
  model: {type: String, required: true},
  color: {type: String},
  engineType: CarProp,
  engineCapacity: {type: Number},
  drive: CarProp,
  enginePower: {type: Number},
  transmission: CarProp,
  leftHandDrive: {type: Boolean},
  year: {type: Number},
  mileage: {type: Number},
  price: {type: String, required: true},
  descr: {type: String},
  guid: {type: String},
  // author: Author,
})

export default mongoose.model('Car', Car)