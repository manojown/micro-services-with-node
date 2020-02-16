
let faker = require('faker');
let fs = require('fs')
const KafkaConnector =  require('../services/kafkaService')
let utlityService = require('../services/utilityService')
let kafka = new KafkaConnector().getInstance()
const { parse } = require('json2csv');
const fields = ['name','number', 'email', 'company'];


// upload file and push each data to kafka broker
exports.fileUpload = async (req, res) => {

  try{

    let csvStore = await utlityService.csv(req.file.path)
    if(csvStore.length) {
      //call kafkaConnector to send data to other microservices
      let response = await kafka.send(csvStore)
      // response with kafka success is not needed but just let you know its work or not
      return res.status(200).send({
        message:"we will process your data if anything we will let you know by email.",
        response:response
      })
    }
    
    return res.status(201).send({
      message:"No data to process something wrong with file.",
    })
 

  } catch(e){

    console.error("error occure while csv and kafka work.",e)
    return res.status(401).send({
      message:"something went wrong.",
      error:e
    })
  }
    

}



// generate csv dump to upload 
exports.generateCsv = async (req,res) => {

  let count =  req.params.count?req.params.count:100;
  let dataStore = [];
  const opts = { fields };

  for(let i=0;i<count;i++){
    dataStore.push(fakeEmployees())
  }

  try {

    const csv = parse(dataStore, opts);
    let fileName = `./public/download/file-${Date.now()}.csv`
    fs.writeFile(fileName, csv, function(err) {
      if (err) throw err;
      return res.download(fileName)
    });

  } catch (err) {

    console.error(err);
    return res.status(501).send({message:'something went wrong.',error:err})

  }


}

function fakeEmployees(){
  
  
    return {
      name : faker.name.findName().toLowerCase(),
      email : faker.internet.email().toLowerCase(),
      company : faker.company.companyName().toLowerCase(),
      number : faker.phone.phoneNumber()
    }
   


}

  