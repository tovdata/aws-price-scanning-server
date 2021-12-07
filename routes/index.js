const express = require('express');
const router = express.Router();

const { CODE } = require('../models/model');

/* GET health check */
router.get('/health', (req, res) => {
  res.status(200).send({ result: CODE.SUCCESS, message: "alive" });
});

module.exports = router;