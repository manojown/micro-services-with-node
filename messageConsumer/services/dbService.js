const knex = require('../knex/knex');


exports.create = async (data) => {
    try {
     
        await knex('user').insert({ name: data.name,number:data.number,email:data.email,company:data.company });

    } catch(e) {
        console.error("result is",e)

    }
}