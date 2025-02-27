import CarService from './CarService.js'

// res.writeHead(200, {
//   'Content-Type': 'application/json'
// })

class CarController {
  async addCar(req, res) {
    try {
      const result = await CarService.addCar(req.body, req.files)
      res.json(result)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async getAllCars(req, res) {
    try {
      const result = await CarService.getAllCars()
      return res.json(result)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async getCarByIdf(req, res) {
    try {
      const { idf } = req.params
      const result = await CarService.getCarByIdf(idf)
      return res.json(result)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }

  async getFavorites(req, res) {
    try {
      const result = await CarService.getFavorites(req.body)
      return res.json(result)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async getUserCars(req, res) {
    try {
      const { idf } = req.params
      const result = await CarService.getUserCars(idf)
      return res.json(result)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async updateCar(req, res) {
    try {
      const result = await CarService.updateCar(req.body, req.files)
      return res.json(result)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }

  async deleteCar(req, res) {
    try {
      const {idf} = req.params
      const result = await CarService.deleteCar(idf)
      return res.json(result)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }
}

export default new CarController()