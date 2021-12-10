const { CODE, MESSAGE } = require('../models/model');
// Logging
const errDbg = require('debug')('logger:error');
const warnDbg = require('debug')('logger:warning');

module.exports = {
  /**
   * [Middleware] Check parameter for aws region
   * @param {*} req request object
   * @param {*} res response object
   * @param {*} next callback function
   * @returns {*} if exist the parameter for region, return next callback function. However if it does not exist, return the response object
   */
  checkParamForRegion: (req, res, next) => {
    if (req.query.region === undefined) {
      warnDbg(`Code: ${CODE.ERROR.NOT_FOUND_PARAMETER}, Message: Not found parameter for region`);
      return res.json({ result: false, message: "The region code is mandatory" });
    } else {
      return next();
    }
  },
  /**
   * Response for request
   * @param {*} res response object
   * @param {*} result result object (contain result code)
   * @returns {*} Return the appropriate response object according to the result of the request
   */
  responseResult: (res, result) => {
    if (result.code !== CODE.SUCCESS) {
      errDbg(`Code: ${result.code}`);
      return res.json({ result: false, message: MESSAGE[result.code] });
    } else {
      return res.json({ result: true, message: result.message });
    }
  }
};