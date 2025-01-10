import CarService from './CarService.js'

// res.writeHead(200, {
//   'Content-Type': 'application/json'
// })

class CarController {
  async addCar(req, res) {
    try {
      const car = await CarService.addCar(req.body, req.files.img)
      res.json(car)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async getAllCars(req, res) {
    try {
      const cars = await CarService.getAllCars()
      return res.json(cars)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async getCarById(req, res) {
    try {
      const { id } = req.params
      const car = await CarService.getCarById(id)
      return res.json(car)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }

  async updateCar(req, res) {
    try {
      const car = req.body
      const updatedCar = await CarService.updateCar(car)
      return res.json(updatedCar)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }

  async deleteCar(req, res) {
    try {
      const {id} = req.params
      const deletedCar = await CarService.deleteCar(id)
      return res.json(deletedCar)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }
}

export default new CarController()