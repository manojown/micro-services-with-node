const KafkaConnector =  require('./services/kafkaService')
const kafka = new KafkaConnector('my-app',['kafka:9092'])
const dbInit = require('./knex/seeds/initiateTable')
dbInit.init()
kafka.subscribe()