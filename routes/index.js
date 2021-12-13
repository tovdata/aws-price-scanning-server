const express = require('express');
const router = express.Router();
// Result code
const { CODE } = require('../models/model');
// Module
const { getServiceList, updateList } = require('../modules/price');
const { scanning, updateServiceList } = require('../modules/scan');
// Logging
const warnDbg = require('debug')('logger:warning');

/** 
 * @method GET
 * @description Health check
 */
router.get('/health', (req, res) => {
  res.status(200).send({ result: CODE.SUCCESS, message: "alive" });
});

/**
 * @method POST
 * @description Scan price data for aws service using aws pricing sdk
 */
router.post('/scan', (req, res) => {
  const list = getServiceList();
  console.log(list);
  list.forEach((serviceCode) => scanning(serviceCode));
  // Response
  res.json({ result: true, message: "Start the scan operation. The result can be checked through the log later." });
});

/**
 * @method POST
 * @description Scan price data for aws service using aws pricing sdk
 */
 router.post('/scan/list', async (req, res) => {
  let result = await updateServiceList();
  // Response
  if (result.code === CODE.SUCCESS) {
    res.json(await updateList());
  } else {
    res.json({ result: false, message: result.message });
  }
});

/**
 * @method POST
 * @description Scan price data for aws service using aws pricing sdk on a specific day
 */
router.post('/scan/specific', (req, res) => {
  if (req.body.date) {
    const now = new Date();
    const date = new Date(req.query.date);
    console.log(date > now);
    return res.json({ result: true });
  } else {
    warnDbg(`Code: ${CODE.ERROR.NOT_FOUND_PARAMETER}, Message: Not found parameter for schedule date`);
    return res.json({ result: false, message: "The schedule date is mandatory" });
  }
});

module.exports = router;