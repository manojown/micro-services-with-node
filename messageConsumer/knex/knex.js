const environment = process.env.ENVIRONMENT || 'development'
const config = require('./knexFile.js')[environment];
module.exports = require('knex')(config);