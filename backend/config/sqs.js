const { SQSClient } =require("@aws-sdk/client-sqs");
const dotenv = require("dotenv");
dotenv.config();



const sqs = new SQSClient({ region: "ap-south-1" });
const queueUrl = process.env.SQS_QUEUE_URL;
module.exports = { sqs, queueUrl };