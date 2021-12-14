const express = require('express');
const router = express.Router();
// Model
const { CODE, SERVICE } = require('../models/model');
// Module
const { checkTheServiceSupport, getProductTypes, getServiceTypes, getAvailableRegionByService } = require('../modules/price');
const { checkParamForRegion, responseResult } = require('../modules/middleware');

/**
 * @method GET
 * @description Return a list of product type of aws service for region
 */
router.get('/products/:service', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
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
    responseResult(res, getProductTypes(serviceCode, req.query.region));
  } else {
    responseResult(res, { code: CODE.ERROR.INVALID_SERVICE_CODE });
  }
});
/**
 * @method GET
 * @description Return a list of regions of aws service for region
 */
 router.get('/regions/:service', (req, res) => {
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
    responseResult(res, getAvailableRegionByService(serviceCode));
  } else {
    responseResult(res, { code: CODE.ERROR.INVALID_SERVICE_CODE });
  }
});
/**
 * @method GET
 * @description Return a list of service type of aws service for region and product type
 */
 router.get('/types/:service', (req, res) => {
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
    responseResult(res, getServiceTypes(serviceCode, req.query.region, req.query.productType));
  } else {
    responseResult(res, { code: CODE.ERROR.INVALID_SERVICE_CODE });
  }
});

// /**
//  * @method GET
//  * @description Return a list of product type of aws dynamodb for region
//  */
// router.get('/products/dynamodb', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
//   responseResult(res, getProductTypes(SERVICE.DYNAMODB, req.query.region));
// });
// /**
//  * @method GET
//  * @description Return a list of product type of aws ebs for region
//  */
// router.get('/products/ebs', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
//   responseResult(res, getProductTypes(SERVICE.EBS, req.query.region));
// });
// /**
//  * @method GET
//  * @description Return a list of product type of aws ec2 for region
//  */
// router.get('/products/ec2', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
//   responseResult(res, getProductTypes(SERVICE.EC2, req.query.region));
// });
// /**
//  * @method GET
//  * @description Return a list of product type of aws ecs for region
//  */
// router.get('/products/ecs', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
//   responseResult(res, getProductTypes(SERVICE.ECS, req.query.region));
// });
// /**
//  * @method GET
//  * @description Return a list of product type of aws efs for region
//  */
// router.get('/products/efs', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
//   responseResult(res, getProductTypes(SERVICE.EFS, req.query.region));
// });
// /**
//  * @method GET
//  * @description Return a list of product type of aws elb for region
//  */
// router.get('/products/elb', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
//   responseResult(res, getProductTypes(SERVICE.ELB, req.query.region));
// });
// /**
//  * @method GET
//  * @description Return a list of product type of aws lambda for region
//  */
// router.get('/products/lambda', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
//   responseResult(res, getProductTypes(SERVICE.LAMBDA, req.query.region));
// });
// /**
//  * @method GET
//  * @description Return a list of product type of aws rds for region
//  */
// router.get('/products/rds', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
//   responseResult(res, getProductTypes(SERVICE.RDS, req.query.region));
// });
// /**
//  * @method GET
//  * @description Return a list of storage class of aws s3 for region
//  */
// router.get('/products/s3', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
//   responseResult(res, getProductTypes(SERVICE.S3, req.query.region));
// });
// /**
//  * @method GET
//  * @description Return a list of product type of aws vpc for region
//  */
//  router.get('/products/vpc', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
//   responseResult(res, getProductTypes(SERVICE.VPC, req.query.region));
// });

// /**
//  * @method GET
//  * @description Return a list of available region of aws dynamodb
//  */
// router.get('/regions/dynamodb', (req, res) => {
//   responseResult(res, getAvailableRegionByService(SERVICE.DYNAMODB));
// });
// /**
//  * @method GET
//  * @description Return a list of available region of aws ebs
//  */
// router.get('/regions/ebs', (req, res) => {
//   responseResult(res, getAvailableRegionByService(SERVICE.EBS));
// });
// /**
//  * @method GET
//  * @description Return a list of available region of aws ec2
//  */
// router.get('/regions/ec2', (req, res) => {
//   responseResult(res, getAvailableRegionByService(SERVICE.EC2));
// });
// /**
//  * @method GET
//  * @description Return a list of available region of aws ecs
//  */
// router.get('/regions/ecs', (req, res) => {
//   responseResult(res, getAvailableRegionByService(SERVICE.ECS));
// });
// /**
//  * @method GET
//  * @description Return a list of available region of aws efs
//  */
// router.get('/regions/efs', (req, res) => {
//   responseResult(res, getAvailableRegionByService(SERVICE.EFS));
// });
// /**
//  * @method GET
//  * @description Return a list of available region of aws elb
//  */
// router.get('/regions/elb', (req, res) => {
//   responseResult(res, getAvailableRegionByService(SERVICE.ELB));
// });
// /**
//  * @method GET
//  * @description Return a list of available region of aws lambda
//  */
// router.get('/regions/lambda', (req, res) => {
//   responseResult(res, getAvailableRegionByService(SERVICE.LAMBDA));
// });
// /**
//  * @method GET
//  * @description Return a list of available region of aws rds
//  */
// router.get('/regions/rds', (req, res) => {
//   responseResult(res, getAvailableRegionByService(SERVICE.RDS));
// });
// /**
//  * @method GET
//  * @description Return a list of available region of aws s3
//  */
//  router.get('/regions/s3', (req, res) => {
//   responseResult(res, getAvailableRegionByService(SERVICE.S3));
// });
// /**
//  * @method GET
//  * @description Return a list of available region of aws vpc
//  */
//  router.get('/regions/vpc', (req, res) => {
//   responseResult(res, getAvailableRegionByService(SERVICE.VPC));
// });

// /**
//  * @method GET
//  * @description Return a list of service type of aws dynamodb for region
//  */
// router.get('/types/dynamodb', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
//   responseResult(res, getServiceTypes(SERVICE.DYNAMODB, req.query.region, req.query.productType));
// });
// /**
//  * @method GET
//  * @description Return a list of service type of aws ebs for region
//  */
// router.get('/types/ebs', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
//   responseResult(res, getServiceTypes(SERVICE.EBS, req.query.region, req.query.productType));
// });
// /**
//  * @method GET
//  * @description Return a list of service type of aws ec2 for region
//  */
// router.get('/types/ec2', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
//   responseResult(res, getServiceTypes(SERVICE.EC2, req.query.region, req.query.productType));
// });
// /**
//  * @method GET
//  * @description Return a list of service type of aws ecs for region
//  */
// router.get('/types/ecs', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
//   responseResult(res, getServiceTypes(SERVICE.ECS, req.query.region, req.query.productType));
// });
// /**
//  * @method GET
//  * @description Return a list of service type of aws efs for region
//  */
// router.get('/types/efs', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
//   responseResult(res, getServiceTypes(SERVICE.EFS, req.query.region, req.query.productType));
// });
// /**
//  * @method GET
//  * @description Return a list of service type of aws elb for region
//  */
// router.get('/types/elb', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
//   responseResult(res, getServiceTypes(SERVICE.ELB, req.query.region, req.query.productType));
// });
// /**
//  * @method GET
//  * @description Return a list of service type of aws lambda for region
//  */
// router.get('/types/lambda', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
//   responseResult(res, getServiceTypes(SERVICE.LAMBDA, req.query.region, req.query.productType));
// });
// /**
//  * @method GET
//  * @description Return a list of service type of aws rds for region
//  */
// router.get('/types/rds', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
//   responseResult(res, getServiceTypes(SERVICE.RDS, req.query.region, req.query.productType));
// });
// /**
//  * @method GET
//  * @description Return a list of service type of aws s3 for region
//  */
//  router.get('/types/s3', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
//   responseResult(res, getServiceTypes(SERVICE.S3, req.query.region, req.query.productType));
// });
// /**
//  * @method GET
//  * @description Return a list of service type of aws vpc for region
//  */
//  router.get('/types/vpc', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
//   responseResult(res, getServiceTypes(SERVICE.VPC, req.query.region, req.query.productType));
// });

module.exports = router;