const knex = require('../knex/knex');


exports.getEmployee = async (matchCriteria,pagination) => {

    let queryFunc =  knex('user').select('*').where(matchCriteria)
    if(pagination){
        return queryFunc.paginate(pagination)
    }
    return queryFunc
    
  
}