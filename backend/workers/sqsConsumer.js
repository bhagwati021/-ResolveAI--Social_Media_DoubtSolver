const { sqs, queueUrl } = require("../config/sqs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Doubt = require("../models/DoubtModel");
const{ ReceiveMessageCommand, DeleteMessageCommand } =require ("@aws-sdk/client-sqs");


dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function processDoubts() {
    try {
        const command = new ReceiveMessageCommand({
            QueueUrl: queueUrl,
            MaxNumberOfMessages: 5,
            WaitTimeSeconds: 10
        });
        const data = await sqs.send(command);

        if (!data.Messages || data.Messages.length === 0) {
            console.log("⏳ No new doubts to process");
            return;
        }

        for (const message of data.Messages) {
            const doubtData = JSON.parse(message.Body);
            console.log("Received messages1:", data.Messages);
            console.log("Received messages2:", message.Body);
            console.log("Received messages3:", doubtData.question);

            try {
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
                const result = await model.generateContent(doubtData.question);
                const response = await result.response;
                const answer = response.text();
                console.log(answer)

                const newDoubt = new Doubt({ userId: doubtData.userId, question: doubtData.question, answer });
                await newDoubt.save();

                await deleteMessage(message.ReceiptHandle);
            } catch (error) {
                console.error("❌ Error processing doubt:", error);
            }
        }

    } catch (error) {
        console.error("❌ Error receiving messages from SQS:", error);
    }

}
async function deleteMessage(receiptHandle) {
    try {
        const deleteCommand = new DeleteMessageCommand({
            QueueUrl: queueUrl,
            ReceiptHandle: receiptHandle
        });

        await sqs.send(deleteCommand);
        console.log("Message deleted successfully");
    } catch (error) {
        console.error("Error deleting message:", error);
    }
}
processDoubts();
