let fs = require('fs')
let excelToJson = require('convert-excel-to-json');


let checkErr = {
  1: 'err exel file path',
  2: 'err Json file path'
}

let data = (path) => {
  return new Promise((res) => {
    let result = excelToJson({
      sourceFile: path,
      columnToKey: {
        A: 'name',
        B: 'age',
        C: 'height',
      }
    })
    result = result.data
    result.shift()
    res(result)
  })
}

let exelToJsonResult = () => {
  return new Promise((resolve) => {
    data('./data.xlsx').then((result) => {
      let cvOBjtoString = JSON.stringify(result)
      resolve(cvOBjtoString)
    })
  })
}

let saveFile = (data) => {
    return new Promise((reject) => {
      fs.writeFile("./data.json", data, (err) => {
        if (err){
         reject(1)
        }
      })
    })

  }

let readfileJson = () => {
    return new Promise((resolve, reject) => {
      fs.readFile("./data.json", {encoding: 'utf8' }, (err, result) => {
        if (err) {
          reject(2)
        }
         resolve(result)
      })
    })
  }

let log = (arg) => {
    console.log(arg)
  }

exelToJsonResult()
      .then((data) => {
        return saveFile(data)
      })
      .then(() => {
        return readfileJson()
      })
      .then((result) => {
         log(result)
      })
      .catch((err)=>{
        if(err === 1 ){
          console.log(checkErr[1])
        }
        console.log(checkErr[2])
      })
   





