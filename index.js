import express from 'express'
import mongoose from 'mongoose'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import carRouter from './router/carRouter.js'
import userRouter from './router/userRouter.js'
import {PORT, DB_URL} from './config.js'

const app = express()

app.use(express.json())
app.use(express.static('static'))
app.use(fileUpload())
app.use(cors())
app.use('/api/car', carRouter)
app.use('/api/user', userRouter)


const startApp = async () => {
  try {
    await mongoose.connect(DB_URL)
    app.listen(PORT, () => console.log(`Start at port ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

startApp()