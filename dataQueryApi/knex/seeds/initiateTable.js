const knex = require('../knex');

exports.init = () => {
     knex.schema.createTable('user', function (table) {
        table.increments('id');
        table.string('name');
        table.string('number');
        table.string('email');
        table.string('company');
    })

}