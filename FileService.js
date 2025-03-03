import * as uuid from 'uuid'
import * as path from 'path'
import * as fs from 'fs'

class FileService {
  saveUserFile(file) {
    try {
      const fileName = uuid.v4() + '.jpg'
      const filePath = path.resolve('static', fileName)
      // fs.rename(filePathOld, filePathNew, (err) => {
      //   if (err) throw err
      // })
      file.mv(filePath)
      return fileName
    } catch (error) {
      console.log(error)
    }
  }

  deleteUserFile(fileName) {
    fs.unlink(path.resolve('static', fileName), (err) => {
      if (err) throw err;
      console.log(fileName +' was deleted');
    })
  }

  saveCarFiles(files) {
    try {
      const fileNames = []
      for (let i = 0; i <= 20; i++) {
        if (files[`carImage${i}`]) {
          const fileName = uuid.v4() + '.jpg'
          const filePath = path.resolve('static', fileName)
          files[`carImage${i}`].mv(filePath)
          fileNames.push(fileName)
        }
      }
      return fileNames
    } catch (error) {
      console.log(error)
    }
  }

  deleteCarFiles(fileNames) {
    for (let fileName of fileNames) {
      fs.unlink(path.resolve('static', fileName), (err) => {
        if (err) throw err;
        console.log(fileName +' was deleted');
      })
    }

  }
}

export default new FileService()