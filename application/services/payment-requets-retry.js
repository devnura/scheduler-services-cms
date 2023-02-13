const winston = require("../helpers/winston.logger");
const axios = require("axios");
const knex = require("../infrastructure/database/knex")
const { v4: uuidv4 } = require('uuid');

exports.service = async () => {
  
  let url = "-" 
  const exec_id = uuidv4()
  const service_name = "RETRY POSTING PAYMEMT REQUEST"
  const parameter_code = "SCEDULER_URL_RETRY_PAYREQ"
  try {

    winston.logger.info(
      `SERVICE : ${service_name} | EXEC ID : ${exec_id} | STARTING SERVICES`
    );

    const parameter = await knex('public.t_m_global_parameter AS tmgp').select([
        "tmgp.c_value"
      ])
      .where('c_code', '=', parameter_code)
      .where('c_status', '=', "A")
      .first()

    if(!parameter) throw new Error(`Failed getting parameter ${parameter_code} !`);

    url = parameter.c_value.toLowerCase()

    const config = {
      headers : {
        'Content-Type': 'application/json',
      }
    }
      
    const {data, status} = await axios.get(url, config)

    winston.logger.info(`SERVICE : ${service_name} | EXEC ID : ${exec_id} | URL : ${url} | RESPONSE CODE : ${status} | RESPONSE DATA : ${JSON.stringify(data)}`)
    
    return data

  } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        winston.logger.info(`SERVICE : ${service_name} | EXEC ID : ${exec_id} | URL : ${url} | RESPONSE CODE : ${error.response.status} | RESPONSE DATA : ${JSON.stringify(error.response.data)}`)

      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        winston.logger.info(`SERVICE : ${service_name} | EXEC ID : ${exec_id} | URL : ${url} | RESPONSE CODE : | RESPONSE DATA : ${JSON.stringify(error.message)}`)
      } else {
        // Something happened in setting up the request that triggered an Error
        winston.logger.info(`SERVICE : ${service_name} | EXEC ID : ${exec_id} | URL : ${url} | ERROR : ${error.message}`)
      }
  }
   
}