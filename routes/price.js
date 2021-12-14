const express = require('express');
const router = express.Router();
// Model
const { SERVICE } = require('../models/model');
// Module
const { findByService, updateData } = require('../modules/price');
const { checkParamForRegion, responseResult } = require('../modules/middleware');

/**
 * @method PUT
 * @description Return the price data of aws dynamodb for region, instanceType, operation
 */
router.put('/', async (req, res) => {
  res.json(await updateData());
});

/**
 * @method GET
 * @description Return the price data of aws dynamodb for region, productType, serviceType, operation
 */
router.get('/:service', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
  // Set service code
  let serviceCode = null;
  switch (req.params.service) {
    case "dynamodb":
      serviceCode = SERVICE.DYNAMODB;
      break;
    case "ebs":
      serviceCode = SERVICE.EBS;
      break;
    case "ec2":
      serviceCode = SERVICE.EC2;
      break;
    case "ecs":
      serviceCode = SERVICE.ECS;
      break;
    case "efs":
      serviceCode = SERVICE.EFS;
      break;
    case "elb":
      serviceCode = SERVICE.ELB;
      break;
    case "lambda":
      serviceCode = SERVICE.LAMBDA;
      break;
    case "rds":
      serviceCode = SERVICE.RDS;
      break;
    case "s3":
      serviceCode = SERVICE.S3;
      break;
    case "vpc":
      serviceCode = SERVICE.VPC;
      break;
    default:
      serviceCode = "none";
      break;
  }
  // Check service code and process
  if (checkTheServiceSupport(serviceCode)) {
    responseResult(res, findByService(serviceCode, req.query.region, req.query.productType, req.query.serviceType, req.query.operation));
  } else {
    responseResult(res, { code: CODE.ERROR.INVALID_SERVICE_CODE });
  }
});

// /**
//  * @method GET
//  * @description Return the price data of aws dynamodb for region, productType, serviceType, operation
//  */
// router.get('/dynamodb', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
//   responseResult(res, findByService(SERVICE.DYNAMODB, req.query.region, req.query.productType, req.query.serviceType, req.query.operation));
// });
// /**
//  * @method GET
//  * @description Return the price data of aws ebs for region, productType, serviceType, operation
//  */
// router.get('/ebs', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
//   responseResult(res, findByService(SERVICE.EBS, req.query.region, req.query.productType, req.query.serviceType, req.query.operation));
// });
// /**
//  * @method GET
//  * @description Return the price data of aws ec2 for region, productType, serviceType, operation
//  */
// router.get('/ec2', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
//   responseResult(res, findByService(SERVICE.EC2, req.query.region, req.query.productType, req.query.serviceType, req.query.operation));
// });
// /**
//  * @method GET
//  * @description Return the price data of aws ecs for region, productType, serviceType, operation
//  */
//  router.get('/ecs', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
//   responseResult(res, findByService(SERVICE.ECS, req.query.region, req.query.productType, req.query.serviceType, req.query.operation));
// });
// /**
//  * @method GET
//  * @description Return the price data of aws efs for region, productType, serviceType, operation
//  */
// router.get('/efs', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
//   responseResult(res, findByService(SERVICE.EFS, req.query.region, req.query.productType, req.query.serviceType, req.query.operation));
// });
// /**
//  * @method GET
//  * @description Return the price data of aws elb for region, productType, serviceType, operation
//  */
// router.get('/elb', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
//   responseResult(res, findByService(SERVICE.ELB, req.query.region, req.query.productType, req.query.serviceType, req.query.operation));
// });
// /**
//  * @method GET
//  * @description Return the price data of aws lambda for region, productType, serviceType, operation
//  */
// router.get('/lambda', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
//   responseResult(res, findByService(SERVICE.LAMBDA, req.query.region, req.query.productType, req.query.serviceType, req.query.operation));
// });
// /**
//  * @method GET
//  * @description Return the price data of aws rds for region, productType, serviceType, operation
//  */
// router.get('/rds', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
//   responseResult(res, findByService(SERVICE.RDS, req.query.region, req.query.productType, req.query.serviceType, req.query.operation));
// });
// /**
//  * @method GET
//  * @description Return the price data of aws s3 for region, productType, serviceType, operation
//  */
// router.get('/s3', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
//   responseResult(res, findByService(SERVICE.S3, req.query.region, req.query.productType, req.query.serviceType, req.query.operation));
// });
// /**
//  * @method GET
//  * @description Return the price data of aws vpc for region, productType, serviceType, operation
//  */
//  router.get('/vpc', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
//   responseResult(res, findByService(SERVICE.VPC, req.query.region, req.query.productType, req.query.serviceType, req.query.operation));
// });

module.exports = router;