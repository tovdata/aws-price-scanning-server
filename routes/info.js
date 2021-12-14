const express = require('express');
const router = express.Router();
// Model
const { CODE, SERVICE } = require('../models/model');
// Module
const { checkTheServiceSupportByName, getProductTypes, getServiceList, getServiceTypes, getAvailableRegionByService, updateData, updateList } = require('../modules/price');
const { checkParamForRegion, responseResult } = require('../modules/middleware');
const { updateServiceList } = require('../modules/scan');

/**
 * @method GET
 * @description Return a list of product type of aws service for region
 */
router.get('/products/:service', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
  if (checkTheServiceSupportByName(req.params.service)) {
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
  if (checkTheServiceSupportByName(req.params.service)) {
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
  if (checkTheServiceSupportByName(req.params.service)) {
    responseResult(res, getServiceTypes(serviceCode, req.query.region, req.query.productType));
  } else {
    responseResult(res, { code: CODE.ERROR.INVALID_SERVICE_CODE });
  }
});

/**
 * @method GET
 * @description Return a list of aws service code
 */
router.get('/service/list', (req, res) => {
  res.json({ result: true, message: getServiceList() });
});

/**
 * @method PUT
 * @description Update a list of aws service code
 */
router.put('/service/list', async (req, res) => {
  const result = await updateServiceList();
  if (result.code === CODE.SUCCESS) {
    res.json(await updateList());
  } else {
    res.json({ result: false, message: result.message });
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