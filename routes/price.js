const express = require('express');
const router = express.Router();
// Model
const { SERVICE } = require('../models/model');
// Module
const { findByService } = require('../modules/price');
const { checkParamForRegion, responseResult } = require('../modules/middleware');

/**
 * @method POST
 * @description Return the price data of aws dynamodb for region, instanceType, operation
 */
router.post('/update', async (req, res) => {
  res.json(await price.update());
});

/**
 * @method GET
 * @description Return the price data of aws dynamodb for region, productType, serviceType, operation
 */
router.get('/dynamodb', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
  responseResult(res, findByService(SERVICE.DYNAMODB, req.query.region, req.query.productType, req.query.serviceType, req.query.operation));
});
/**
 * @method GET
 * @description Return the price data of aws ebs for region, productType, serviceType, operation
 */
router.get('/ebs', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
  responseResult(res, findByService(SERVICE.EBS, req.query.region, req.query.productType, req.query.serviceType, req.query.operation));
});
/**
 * @method GET
 * @description Return the price data of aws ec2 for region, productType, serviceType, operation
 */
router.get('/ec2', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
  responseResult(res, findByService(SERVICE.EC2, req.query.region, req.query.productType, req.query.serviceType, req.query.operation));
});
/**
 * @method GET
 * @description Return the price data of aws ecs for region, productType, serviceType, operation
 */
 router.get('/ecs', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
  responseResult(res, findByService(SERVICE.ECS, req.query.region, req.query.productType, req.query.serviceType, req.query.operation));
});
/**
 * @method GET
 * @description Return the price data of aws efs for region, productType, serviceType, operation
 */
router.get('/efs', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
  responseResult(res, findByService(SERVICE.EFS, req.query.region, req.query.productType, req.query.serviceType, req.query.operation));
});
/**
 * @method GET
 * @description Return the price data of aws elb for region, productType, serviceType, operation
 */
router.get('/elb', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
  responseResult(res, findByService(SERVICE.ELB, req.query.region, req.query.productType, req.query.serviceType, req.query.operation));
});
/**
 * @method GET
 * @description Return the price data of aws lambda for region, productType, serviceType, operation
 */
router.get('/lambda', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
  responseResult(res, findByService(SERVICE.LAMBDA, req.query.region, req.query.productType, req.query.serviceType, req.query.operation));
});
/**
 * @method GET
 * @description Return the price data of aws rds for region, productType, serviceType, operation
 */
router.get('/rds', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
  responseResult(res, findByService(SERVICE.RDS, req.query.region, req.query.productType, req.query.serviceType, req.query.operation));
});
/**
 * @method GET
 * @description Return the price data of aws s3 for region, productType, serviceType, operation
 */
router.get('/s3', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
  responseResult(res, findByService(SERVICE.S3, req.query.region, req.query.productType, req.query.serviceType, req.query.operation));
});
/**
 * @method GET
 * @description Return the price data of aws vpc for region, productType, serviceType, operation
 */
 router.get('/vpc', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
  responseResult(res, findByService(SERVICE.VPC, req.query.region, req.query.productType, req.query.serviceType, req.query.operation));
});

module.exports = router;