const express = require('express');
const router = express.Router();
// Model
const { SERVICE } = require('../models/model');
// Module
const { getProductTypes, getServiceTypes, getAvailableRegionByService } = require('../modules/price');
const { checkParamForRegion, responseResult } = require('../modules/middleware');

/**
 * @method GET
 * @description Return a list of product type of aws dynamodb for region
 */
 router.get('/dynamodb/products', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
  responseResult(res, getProductTypes(SERVICE.DYNAMODB, req.query.region));
});
/**
 * @method GET
 * @description Return a list of available region of aws dynamodb
 */
 router.get('/dynamodb/regions', (req, res) => {
  responseResult(res, getAvailableRegionByService(SERVICE.DYNAMODB));
});
/**
 * @method GET
 * @description Return a list of service type of aws dynamodb for region
 */
 router.get('/dynamodb/types', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
  responseResult(res, getServiceTypes(SERVICE.DYNAMODB, req.query.region, req.query.productType));
});

/**
 * @method GET
 * @description Return a list of product type of aws ebs for region
 */
 router.get('/ebs/products', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
  responseResult(res, getProductTypes(SERVICE.EBS, req.query.region));
});
/**
 * @method GET
 * @description Return a list of available region of aws ebs
 */
 router.get('/ebs/regions', (req, res) => {
  responseResult(res, getAvailableRegionByService(SERVICE.EBS));
});
/**
 * @method GET
 * @description Return a list of service type of aws ebs for region
 */
 router.get('/ebs/types', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
  responseResult(res, getServiceTypes(SERVICE.EBS, req.query.region, req.query.productType));
});

/**
 * @method GET
 * @description Return a list of product type of aws ec2 for region
 */
 router.get('/ec2/products', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
  responseResult(res, getProductTypes(SERVICE.EC2, req.query.region));
});
/**
 * @method GET
 * @description Return a list of available region of aws ec2
 */
 router.get('/ec2/regions', (req, res) => {
  responseResult(res, getAvailableRegionByService(SERVICE.EC2));
});
/**
 * @method GET
 * @description Return a list of service type of aws ec2 for region
 */
 router.get('/ec2/types', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
  responseResult(res, getServiceTypes(SERVICE.EC2, req.query.region, req.query.productType));
});

/**
 * @method GET
 * @description Return a list of product type of aws efs for region
 */
 router.get('/efs/products', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
  responseResult(res, getProductTypes(SERVICE.EFS, req.query.region));
});
/**
 * @method GET
 * @description Return a list of available region of aws efs
 */
 router.get('/efs/regions', (req, res) => {
  responseResult(res, getAvailableRegionByService(SERVICE.EFS));
});
/**
 * @method GET
 * @description Return a list of service type of aws efs for region
 */
 router.get('/efs/types', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
  responseResult(res, getServiceTypes(SERVICE.EFS, req.query.region, req.query.productType));
});

/**
 * @method GET
 * @description Return a list of product type of aws elb for region
 */
 router.get('/elb/products', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
  responseResult(res, getProductTypes(SERVICE.ELB, req.query.region));
});
/**
 * @method GET
 * @description Return a list of available region of aws elb
 */
 router.get('/elb/regions', (req, res) => {
  responseResult(res, getAvailableRegionByService(SERVICE.ELB));
});
/**
 * @method GET
 * @description Return a list of service type of aws elb for region
 */
 router.get('/elb/types', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
  responseResult(res, getServiceTypes(SERVICE.ELB, req.query.region, req.query.productType));
});

/**
 * @method GET
 * @description Return a list of product type of aws lambda for region
 */
 router.get('/lambda/products', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
  responseResult(res, getProductTypes(SERVICE.LAMBDA, req.query.region));
});
/**
 * @method GET
 * @description Return a list of available region of aws lambda
 */
 router.get('/lambda/regions', (req, res) => {
  responseResult(res, getAvailableRegionByService(SERVICE.LAMBDA));
});
/**
 * @method GET
 * @description Return a list of service type of aws lambda for region
 */
 router.get('/lambda/types', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
  responseResult(res, getServiceTypes(SERVICE.LAMBDA, req.query.region, req.query.productType));
});

/**
 * @method GET
 * @description Return a list of product type of aws rds for region
 */
 router.get('/rds/products', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
  responseResult(res, getProductTypes(SERVICE.RDS, req.query.region));
});
/**
 * @method GET
 * @description Return a list of available region of aws rds
 */
 router.get('/rds/regions', (req, res) => {
  responseResult(res, getAvailableRegionByService(SERVICE.RDS));
});
/**
 * @method GET
 * @description Return a list of service type of aws rds for region
 */
 router.get('/rds/types', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
  responseResult(res, getServiceTypes(SERVICE.RDS, req.query.region, req.query.productType));
});

/**
 * @method GET
 * @description Return a list of storage class of aws s3 for region
 */
 router.get('/s3/products', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
  responseResult(res, getProductTypes(SERVICE.S3, req.query.region));
});
/**
 * @method GET
 * @description Return a list of available region of aws s3
 */
 router.get('/s3/regions', (req, res) => {
  responseResult(res, getAvailableRegionByService(SERVICE.S3));
});
/**
 * @method GET
 * @description Return a list of service type of aws rds for region
 */
 router.get('/s3/types', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
  responseResult(res, getServiceTypes(SERVICE.S3, req.query.region, req.query.productType));
});

module.exports = router;