const winston = require("../helpers/winston.logger");
const axios = require("axios");

exports.generate_invoice = async () => {

    const config = {
        method: 'get',
        headers : {
          'Content-Type': 'application/json',
          'responseType': 'json',
        },
        auth: {
          username: credential.username,
          password: credential.password
        }
      }
      
    const response = await axios.post(url, config)

    winston.logger.info(`SERVICE : invoice | RESPONSE : ${JSON.stringify(response)}`)
    
    return response

}