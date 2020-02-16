const csv = require('csv-parser');
const fs = require('fs');

exports.csv = (path) => {

    let storeCsv = []
    return new Promise((resolve)=>{
        fs.createReadStream(path)
        .pipe(csv())
        .on('data', (row) => {
            storeCsv.push(row)
        })
        .on('end', () => {
          return resolve(storeCsv)
        })
    })
   
} 