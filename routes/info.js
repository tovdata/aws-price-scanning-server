const express = require('express');
const router = express.Router();
// Model
const { CODE } = require('../models/model');
// Module
const { checkTheServiceSupport, getServiceCodeForName, getServiceList, getServiceTypes } = require('../modules/price');
const { getProductTypes, getAvailableRegionByService, updateList } = require('../modules/price');
const { checkParamForRegion, responseResult } = require('../modules/middleware');
const { updateServiceList } = require('../modules/scan');

/**
 * @method GET
 * @description Return a list of product type of aws service for region
 */
router.get('/products/:service', (req, res, next) => checkParamForRegion(req, res, next), (req, res) => {
  // Get service code
  const serviceCode = getServiceCodeForName(req.params.service);
  // Process
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
  // Get service code
  const serviceCode = getServiceCodeForName(req.params.service);
  // Process
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
  // Get service code
  const serviceCode = getServiceCodeForName(req.params.service);
  // Process
  if (checkTheServiceSupport(serviceCode)) {
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
  responseResult(res, { code: CODE.SUCCESS, message: getServiceList() })
});

/**
 * @method PUT
 * @description Update a list of aws service code
 */
router.put('/service/list', async (req, res) => {
  const result = await updateServiceList();
  if (result.code === CODE.SUCCESS) {
    responseResult(res, await updateList());
  } else {
    responseResult(res, result);
  }
});

module.exports = router;