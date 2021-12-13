module.exports = {
  CODE: {
    ERROR: {
      NOT_FOUND_OBJECT: 10,           // Not found object in an aws s3
      NOT_FOUND_PARAMETER: 11,        // Not found parameter
      INVALID_JSON: 20,               // The data format is not JSON
      INVALID_REGION: 21,             // Invalid aws region code
      INVALID_SERVICE_CODE: 22,       // Invalid aws service code
      INVALID_PRODUCT_TYPE: 23,       // Invalid product type (ex. instance, storage, throughput ...)
      INVALID_SERVICE_TYPE: 24,       // Invalid service type (ex. instance type, storage class ...)
      INVALID_OPERATION: 25,          // Invalid operation code (ex. RunInstances, CreateDBInstances, Storage...)
      FAILED_SCAN: 30,                // Failed scan (to execute scanner)
      INTERAL_SERVER: 100,            // Internal server error
    },
    SUCCESS: 0
  },
  MESSAGE: {
    21: "This is an invalid region code.",
    22: "It is either an unsupported service code or an invalid service code.",
    23: "This is an invalid product type.",
    24: "This is an invalid service type.",
    25: "This is an invalid operation code."
  },
  SERVICE: {
    DYNAMODB: "AmazonDynamoDB",
    EBS: "AmazonEBS",
    EC2: "AmazonEC2",
    ECS: "AmazonECS",
    EFS: "AmazonEFS",
    ELB: "AWSELB",
    LAMBDA: "AWSLambda",
    RDS: "AmazonRDS",
    S3: "AmazonS3",
    VPC: "AmazonVPC"
  }
}