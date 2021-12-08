module.exports = {
  CODE: {
    ERROR: {
      NOT_FOUND_OBJECT: 10,           // Not found object in an aws s3
      NOT_FOUND_PARAMETER: 11,        // Not found parameter
      INVALID_JSON: 20,               // The data format is not JSON
      INVALID_REGION: 21,             // Invalid aws region code
      INVALID_SERVICE_CODE: 22,       // Invalid aws service code
      INVALID_PRODUCT_TYPE: 23,       // Invalid product type (ex. instance type, storage class ...)
      INVALID_OPERATION: 24,          // Invalid operation code (ex. RunInstances, CreateDBInstances, Storage...)
      INTERAL_SERVER: 100,            // Internal server error
    },
    SUCCESS: 0
  },
  MESSAGE: {
    21: "This is an invalid region code.",
    22: "It is either an unsupported service code or an invalid service code.",
    23: "This is an invalid product type.",
    24: "This is an invalid operation code."
  },
  SERVICE: {
    EBS: "AmazonEBS",
    EC2: "AmazonEC2",
    LAMBDA: "AWSLambda",
    RDS: "AmazonRDS",
    S3: "AmazonS3"
  }
}