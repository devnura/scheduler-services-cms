const winston = require("../helpers/winston.logger");
const axios = require("axios");
const knex = require("../infrastructure/database/knex")
const { v4: uuidv4 } = require('uuid');

exports.generateInvoice = async () => {
  
  let url = "-" 
  const exec_id = uuidv4()
  const service_name = "GENERATE INVOICE"
  const parameter_code = "SCEDULER_URL_GENERATE_INVOICE"
  try {

    winston.logger.info(
      `EXEC ID : ${exec_id} | SERVICE : ${service_name} | STARTING SERVICES`
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

    winston.logger.info(`EXEC ID : ${exec_id} | SERVICE : ${service_name} | URL : ${url} | RESPONSE CODE : ${status} | RESPONSE DATA : ${JSON.stringify(data)}`)
    
    return data

  } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        winston.logger.info(`EXEC ID : ${exec_id} | SERVICE : ${service_name} | URL : ${url} | RESPONSE CODE : ${error.response.status} | RESPONSE DATA : ${JSON.stringify(error.response.data)}`)

      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        winston.logger.info(`EXEC ID : ${exec_id} | SERVICE : ${service_name} | URL : ${url} | RESPONSE CODE : | RESPONSE DATA : ${JSON.stringify(error.message)}`)
      } else {
        // Something happened in setting up the request that triggered an Error
        winston.logger.info(`EXEC ID : ${exec_id} | SERVICE : ${service_name} | URL : ${url} | ERROR : ${error.message}`)
      }
  }
   
}