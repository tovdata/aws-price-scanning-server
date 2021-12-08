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
  },
  /**
   * Find price data by service
   * @param {string} serviceCode aws service code (ex. AmazonEC2)
   * @param {string} region aws region code (ex. ap-northeast-2)
   * @param {string} productType product type (instance class or storage class)
   * @param {string} operation operation code (ex. RunInstances, CreateDBInstances...)
   * @returns {*} result format { code: number, message: string|object }
   */
  findByService: (serviceCode, region, productType, operation) => {
    try {
      // Check service code
      if (priceData[serviceCode] === undefined) return { code: CODE.ERROR.INVALID_SERVICE_CODE, message: {} };
      // Extract and return
      let result = priceData[serviceCode][region];
      if (result && productType) {
        result = priceData[serviceCode][region][productType];
        if (result && operation) {
          result = priceData[serviceCode][region][productType].onDemand[operation];
          if (result) {
            return { code: CODE.SUCCESS, message: { product: priceData[serviceCode][region][productType].product, onDemand: result } };
          } else {
            return { code: CODE.ERROR.INVALID_OPERATION, message: {} };
          }
        } else if (result && operation === undefined) {
          return { code: CODE.SUCCESS, message: result };
        } else {
          return { code: CODE.ERROR.INVALID_PRODUCT_TYPE, message: {} };
        }
      } else if (result && productType === undefined) {
        return { code: CODE.SUCCESS, message: result };
      } else {
        return { code: CODE.ERROR.INVALID_REGION, message: {} };
      }
    } catch (err) {
      return { code: CODE.ERROR.INTERAL_SERVER, message: err.message }
    }
  },
  /**
   * Get a list of product type by service and region
   * @param {string} serviceCode aws service code (ex. AmazonEC2)
   * @param {string} region aws region (ex. ap-northeast-2)
   * @returns {*} result format { code: number, message: string|object }
   */
  getProductTypes: (serviceCode, region) => {
    try {
      // Check service code
      if (priceData[serviceCode] === undefined) return { code: CODE.ERROR.INVALID_SERVICE_CODE, message: {} };
      // Extract and return
      const result = priceData[serviceCode][region];
      if (result) {
        return { code: CODE.SUCCESS, message: Object.keys(result) };
      } else {
        return { code: CODE.ERROR.INVALID_REGION, message: [] };
      }
    } catch (err) {
      return { code: CODE.ERROR.INTERAL_SERVER, message: err.message };
    }
  }
}