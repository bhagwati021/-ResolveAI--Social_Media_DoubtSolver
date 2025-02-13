const { SQSClient, SendMessageCommand } =require("@aws-sdk/client-sqs");

const sqs = new SQSClient({ region: "ap-south-1" }); // Set your region

const sendMessage = async () => {
  const params = {
    QueueUrl: "https://sqs.ap-south-1.amazonaws.com/851725641866/DoubtQueue",
    MessageBody: JSON.stringify({ message: "Hello, SQS!" }),
    MessageAttributes: {
        Title: {
          DataType: "String",
          StringValue: "The Whistler",
        },
        Author: {
          DataType: "String",
          StringValue: "John Grisham",
        },
        WeeksOn: {
          DataType: "Number",
          StringValue: "6",
        },
      },
      
  };

  try {
    const data = await sqs.send(new SendMessageCommand(params));
    console.log("Message sent! Message ID:", data.MessageId);
  } catch (err) {
    console.error("Error sending message:", err);
  }
};

sendMessage();
