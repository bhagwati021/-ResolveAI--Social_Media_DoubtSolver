const { SendMessageCommand } = require("@aws-sdk/client-sqs");
const { sqs, queueUrl } = require("../config/sqs");
const Doubt = require("../models/DoubtModel");

// Submit doubt to SQS
exports.submitDoubt = async (req, res) => {
    try {
        const { userId, question } = req.body;

        if (!userId || !question) {
            return res.status(400).json({ message: "User ID and question are required" });
        }

        const params = {
            QueueUrl: queueUrl,
            MessageBody: JSON.stringify({ userId, question }),
        };

        const result = await sqs.send(new SendMessageCommand(params));
        console.log("✅ Doubt sent to SQS:", result.MessageId);

        res.status(200).json({ message: "Doubt submitted successfully", messageId: result.MessageId });
    } catch (error) {
        console.error("❌ Error sending doubt to SQS:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

// Fetch all doubts
exports.getAllDoubts = async (req, res) => {
    try {
        const doubts = await Doubt.find().sort({ createdAt: -1 });
        res.status(200).json(doubts);
    } catch (error) {
        console.error("❌ Error fetching doubts:", error);
        res.status(500).json({ message: "Could not fetch doubts" });
    }
};
