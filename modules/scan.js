const { LambdaClient, InvokeCommand } = require('@aws-sdk/client-lambda');
// Result code
const { CODE } = require('../models/model');
// Logging
const appDbg = require('debug')('logger:app');
// Set lambda function arn
const FUNCTION_ARN = process.env.FUNCTION_ARN ? process.env.FUNCTION_ARN : "arn:aws:lambda:ap-northeast-2:395824177941:function:awsPriceScannerProcess";

module.exports = {
  /**
   * Scan price data using aws sdk (execute the price scanner)
   * @param {string} serviceCode aws service code (ex. AmazonEC2)
   */
  scanning: async (serviceCode) => {
    try {
      // Create client
      const client = new LambdaClient({ region: process.env.region });

      // Create payload
      const payload = Buffer.from(JSON.stringify({serviceCode}));
      // Set input parameter
      const input = {
        FunctionName: FUNCTION_ARN,
        InvocationType: "Event",
        Payload: payload
      };

      // Create command
      const command = new InvokeCommand(input);
      // Send command
      const response = await client.send(command);
      appDbg(`Async invoke (for ${serviceCode}) result code : ${response.StatusCode}`);
    } catch (err) {
      errDbg(`Code: ${CODE.ERROR.INTERAL_SERVER}, message: ${err.message}`);
    }
  },
  /**
   *  Update a list of service code
   * @returns {Promise<any>} return format { code: number, message: string }
   */
  updateServiceList: async () => {
    try {
      // Create client
      const client = new LambdaClient({ region: process.env.region });

      // Create payload
      const payload = Buffer.from(JSON.stringify({serviceCode: "all"}));
      // Set input parameter
      const input = {
        FunctionName: FUNCTION_ARN,
        InvocationType: "RequestResponse",
        Payload: payload
      };

      // Create command
      const command = new InvokeCommand(input);
      // Send command
      const response = await client.send(command);
      return { code: CODE.SUCCESS, message: `status code: ${response.StatusCode}` };
    } catch (err) {
      return { code: CODE.ERROR.INTERAL_SERVER, message: err.message };
    }
  }
}