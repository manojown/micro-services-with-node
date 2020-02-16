const { Kafka } = require('kafkajs')
const  batchPromises = require('batch-promises')
const BATCH_SIZE = 3;

class KafkaConnector{

    // we can get that all value via .env file if we do menstioned in .env
    constructor(clientId,servers){
        this.clientId =  clientId | 'my-app'
        this.servers = servers | ['localhost:9092']
        if (!KafkaConnector.instance) {
            this.connection = new Kafka({clientId: clientId,brokers: servers}).producer();   
        }
    }
    
    // batch operation so main thread is not block and sort out as promises
    // Note : we can optimize more further via service worker and not response till push data to message queue
    async batchOperation(employees){

        return batchPromises(BATCH_SIZE,employees,async (employee) => {
            let eachBatchInfo = {}
            let result = await this.connection.send({ topic: 'test-topic', messages: [{value:JSON.stringify(employee)}]})
            eachBatchInfo.success =  result.errorCode ? 'Failed' : 'Success';
            eachBatchInfo.employee = employee
            return eachBatchInfo
        })

    }

    async send(employees){
        try {

            await this.connection.connect()
            let response = this.batchOperation(employees)
            await this.connection.disconnect()  
            return response

        }catch(e) {
            console.error("eror while send kafka serviec",e)
            return e
        }   
    }
    
}


// only single instance of kafka broker reside in whole app no matter how many you time you require services
class Singleton {

    constructor() {
        console.log("called this singleton")
        if (!Singleton.instance) {
            Singleton.instance = new KafkaConnector('my-app',['kafka:9092']);
        }
    }
  
    getInstance() {
        return Singleton.instance;
    }
  
  }
  
module.exports = Singleton;

 



