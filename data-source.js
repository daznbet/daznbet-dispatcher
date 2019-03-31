const AWS = require('aws-sdk')
AWS.config.update({region: 'us-east-1'})
const dynamo = new AWS.DynamoDB.DocumentClient()

class Dynamo {
  putItem(params) {
    try {
      dynamo.put(params, (err, data) => {
        if(err) throw new Error(err)
      
        return data
      })
    
    } catch(err) {
      return {
        statusCode: 500,
        message: 'Internal Error'
      }
    }
  }
}

module.exports = Dynamo