const { Kafka } = require('kafkajs')

const db = require('./dbService')


module.exports = class KafkaConnector {

    constructor(clientId, servers) {
        this.clientId = clientId | 'my-app'
        this.servers = servers | ['192.168.0.110:9092']
        this.consumer = new Kafka({
            clientId: clientId,
            brokers: servers
        }).consumer({
            groupId: 'test-group'
        })
    }

    async subscribe() {
        try {
            await this.consumer.connect()
            await this.consumer.subscribe({
                topic: 'test-topic',
                fromBeginning: true
            })

            await this.consumer.run({
                eachMessage: async ({ topic, partition, message}) => {
                
                    let data = JSON.parse(message.value)
                    db.create(data)

                },
            })
        } catch (e) {
            console.error("eror while send kafka serviec", e)
        }
    }
}



