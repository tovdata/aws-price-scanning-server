const express = require('express');
const router = express.Router();
// Result code
const { CODE, SERVICE, MESSAGE } = require('../models/model');
// Module
const price = require('../modules/price');
// Logging
const errDbg = require('debug')('logger:error');
const warnDbg = require('debug')('logger:warning');

/**
 * [Middleware] Check parameter for aws region
 * @param {*} req request object
 * @param {*} res response object
 * @param {*} next callback function
 * @returns {*} if exist the parameter for region, return next callback function. However if it does not exist, return the response object
 */
function checkParamForRegion(req, res, next) {
  if (req.query.region === undefined) {
    warnDbg(`Code: ${CODE.ERROR.NOT_FOUND_PARAMETER}, Message: Not found parameter for region`);
    return res.json({ result: false, message: "The region code is mandatory" });
  } else {
    return next();
  }
}
/**
 * Response for request
 * @param {*} res response object
 * @param {*} result result object (contain result code)
 * @returns {*} Return the appropriate response object according to the result of the request
 */
function responseResult(res, result) {
  if (result.code !== CODE.SUCCESS) {
    errDbg(`Code: ${result.code}`);
    return res.json({ result: false, message: MESSAGE[result.code] });
  } else {
    return res.json({ result: true, message: result.message });
  }
}

/**
 * @method GET
 * @desc Return the price data of aws ebs for region, instanceType, operation
 */
 router.get('/ebs', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
  responseResult(res, price.findByService(SERVICE.EBS, req.query.region, req.query.productType, "storage"));
});
/**
 * @method GET
 * @desc Return a list of valume type of aws ebs for region
 */
router.get('/ebs/products', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
  responseResult(res, price.getProductTypes(SERVICE.EBS, req.query.region));
});
/**
 * @method GET
 * @desc Return the price data of aws ec2 for region, instanceType, operation
 */
router.get('/ec2', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
  responseResult(res, price.findByService(SERVICE.EC2, req.query.region, req.query.productType, req.query.operation));
});
/**
 * @method GET
 * @desc Return a list of instance type of aws ec2 for region
 */
router.get('/ec2/products', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
  responseResult(res, price.getProductTypes(SERVICE.EC2, req.query.region));
});
/**
 * @method GET
 * @desc Return the price data of aws rds for region, instanceType, operation
 */
 router.get('/rds', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
  responseResult(res, price.findByService(SERVICE.RDS, req.query.region, req.query.productType, req.query.operation));
});
/**
 * @method GET
 * @desc Return a list of instance type of aws rds for region
 */
router.get('/rds/products', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
  responseResult(res, price.getProductTypes(SERVICE.RDS, req.query.region));
});
/**
 * @method GET
 * @desc Return the price data of aws s3 for region, instanceType, operation
 */
 router.get('/s3', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
  responseResult(res, price.findByService(SERVICE.S3, req.query.region, req.query.productType, "storage"));
});
/**
 * @method GET
 * @desc Return a list of storage class of aws s3 for region
 */
router.get('/s3/products', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
  responseResult(res, price.getProductTypes(SERVICE.S3, req.query.region));
});

module.exports = router;