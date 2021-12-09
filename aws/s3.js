const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
// Result code
const { CODE } = require('../models/model');
// Set global various
let client = null;
let gBucket = null;
let gDirSet = { slDir: "", slFile: "", pdDir: "" };

module.exports = {
  /**
   * Configure AWS S3
   * @param {string} region aws region code (ex. ap-northeast-2)
   * @param {string} bucket aws s3 bucket name
   * @param {*} dirSet directory name set in aws s3 bucket
   */
  configure: (bucket, dirSet) => {
    client = new S3Client({ region: process.env.region });
    // Set data
    gBucket = bucket;
    gDirSet = dirSet;
  },
  /**
   * Load a list of service code
   * @returns {*} result format { code: number, message: string|array }
   */
  loadServiceList: async () => {
    // Set input parameter
    const input = {
      Bucket: gBucket,
      Key: `${gDirSet.slDir}/${gDirSet.slFile}`
    };
    // Execute command
    try {
      const data = await getObject(input);
      // Return
      if (data === "") return { code: CODE.ERROR.NOT_FOUND_OBJECT, message: [] };
      else return { code: CODE.SUCCESS, message: JSON.parse(data) };
    } catch (err) {
      return { code: CODE.ERROR.INVALID_JSON, message: err };
    }
  },
  /**
   * Load a price information by service
   * @param {string} serviceCode aws service code (ex. AmazonEC2)
   * @returns {*} result format { code: number, message: string|array }
   */
  loadPriceData: async (serviceCode) => {
    // Set input parameter
    const input = {
      Bucket: gBucket,
      Key: `${gDirSet.pdDir}/${serviceCode}.json`
    };
    // Execute comamnd
    try {
      const data = await getObject(input);
      // Return
      if (data === "") return { code: CODE.ERROR.NOT_FOUND_OBJECT, message: [] };
      else return { code: CODE.SUCCESS, message: JSON.parse(data) };
    } catch (err) {
      return { code: CODE.ERROR.INVALID_JSON, message: err };
    }
  }
};

/**
 * Get a object from an AWS S3
 * @param {*} input 
 * @return {Promise<string>} object data
 */
async function getObject(input) {
  // Create command
  const command = new GetObjectCommand(input);
  // Send command
  const response = await client.send(command);
  // Convert to string (stream -> string)
  return await readStream(response.Body);
}

/**
 * Read stream
 * @param {*} stream readable stream
 * @returns {Promise<string>} converted stream data
 */
function readStream(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', chunk => chunks.push(chunk));
    stream.on('error', err => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  });
}