const knex = require('../knex');

exports.init = async () => {
    try {
      let isInit = await  knex.schema.createTable('user', function (table) {
            table.increments('id');
            table.string('name');
            table.string('number');
            table.string('email');
            table.string('company');
        })
        console.log("initialize successfully")
    } catch(e) {
        console.error("failed to init :: ",e)
    }
   

}