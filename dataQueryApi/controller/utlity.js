
const querystring = require('querystring');
const url = require('url')
const dbService = require('../services/dbService')
const filterAllowed = ['company','name','email','number'];



// here i used querystring as solr search used please reger solr doc or query string https://en.wikipedia.org/wiki/Query_string
exports.getEmployee = async (req, res) => {

  let parsedUrl = url.parse(req.url);
  let matchCriteria = querystring.parse(parsedUrl.query);
  let filterFields = queryBuilder(matchCriteria)
  let pagination;

  if(matchCriteria.rows && matchCriteria.start) {
    pagination = {
      perPage: matchCriteria.rows,
      currentPage: matchCriteria.start
    }
  }

  try {

    let data = await dbService.getEmployee(filterFields,pagination)
    return res.status(200).send({
      message:"Employee list.",
      data:data
    })

  }catch(e) {

    return res.status(400).send({
      message:"something went wrong.",
      error:e
    })

  }

}



// to check that whatever filtered pass in querystring is valid or not if not valid its just neglect
function queryBuilder(queryObject){
  let filterFields = {}
  for(let i in filterAllowed){
    if( queryObject[filterAllowed[i]] ) filterFields[filterAllowed[i]] = queryObject[filterAllowed[i]];
  }
  return filterFields
}

  