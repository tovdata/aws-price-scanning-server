const express = require('express');
const router = express.Router();
// Model
const { SERVICE } = require('../models/model');
// Module
const { checkTheServiceSupport, findByService, updateData } = require('../modules/price');
const { checkParamForRegion, responseResult } = require('../modules/middleware');

/**
 * @method PUT
 * @description Return the price data of aws dynamodb for region, instanceType, operation
 */
router.put('/', async (req, res) => {
  responseResult(res, await updateData());
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

module.exports = router;