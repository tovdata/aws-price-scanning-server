const s3 = require('../aws/s3');
// Result code
const { CODE } = require('../models/model');
// Set global various
const serviceList = {};
const priceData = {};

module.exports = {
  /**
   * Check the service support
   * @param {string} serviceCode aws service code (ex. AmazonEC2)
   * @returns {boolean} support result
   */
  checkTheServiceSupport: (serviceCode) => {
    return serviceList[serviceCode] !== undefined ? true : false;
  },
  /**
   * Configuration
   * @returns {*} result format { code: number, message: string }
   */
  configure: async () => {
    // Configure an AWS S3
    s3.configure("ap-northeast-2", "dev-hmin", {slDir: "aws-price-scanner", slFile: "serviceList.json", pdDir: "aws-price-scanner"});

    // Load a list of service code
    const result = await s3.getServiceList();
    if (result.code === CODE.SUCCESS) {
      for (const serviceCode of result.message) {
        serviceList[serviceCode] = true;
      }
    } else {
      return { code: result.code, message: "Not found a list of service code" };
    }
    // Load a price data by service
    for (const serviceCode of Object.keys(serviceList)) {
      const result = await s3.getPriceData(serviceCode);
      if (result.code === CODE.SUCCESS) {
        priceData[serviceCode] = result.message;
      } else {
        return { code: result.code, message: `Failed to load a price information for AWS service (service code: ${serviceCode})` };
      }
    }
    return { code: CODE.SUCCESS, message: "Successfully fetched pricing information for AWS services" };
  }
}