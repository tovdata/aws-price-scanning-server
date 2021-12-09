const express = require('express');
const router = express.Router();
// Result code
const { CODE } = require('../models/model');
// Module
const { getServiceList } = require('../modules/price');
const scan = require('../modules/scan');

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
  list.forEach((serviceCode) => scan.scanning(serviceCode));
  // Response
  res.json({ result: true, message: "Start the scan operation. The result can be checked through the log later." });
});

/**
 * @method POST
 * @description Scan price data for aws service using aws pricing sdk on a specific day
 */
router.post('/scan/specific', (req, res) => {
  if (req.query.date) {
    const now = new Date();
    const date = new Date(req.query.date);
    console.log(date > now);
  } else {
    warnDbg(`Code: ${CODE.ERROR.NOT_FOUND_PARAMETER}, Message: Not found parameter for schedule date`);
    return res.json({ result: false, message: "The schedule date is mandatory" });
  }
});

module.exports = router;