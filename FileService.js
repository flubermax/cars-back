import * as uuid from 'uuid'
import * as path from 'path'
import * as fs from 'fs'

class FileService {
  saveFile(file) {
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

  deleteFile(fileName) {
    const file = path.resolve('static', fileName)
    fs.unlink(path.resolve('static', fileName), (err) => {
      if (err) throw err;
      console.log('path/file.txt was deleted');
    })
  }
}

export default new FileService()