const { Kafka } = require("kafkajs");

// Read a message as argument from the command line
const msg = process.argv[2];

const run = async () => {
  try {
    // Create a new Kafka-object
    const kafka = new Kafka({
      clientId: "my-app",
      brokers: ["localhost:9092"], // Since you're working with zookeeper, you can have multiple brokers
    });

    // Create a producer
    const producer = kafka.producer();
    console.log("Connecting...");
    await producer.connect();
    console.log("Connected");

    // Define a rule for choosing which partition to send the message to
    const partition = msg[0] < "N" ? 0 : 1;

    // Produce a message
    const result = await producer.send({
      topic: "Users",
      messages: [
        {
          value: msg,
          partition: partition,
        },
      ],
    });

    console.log("Sent successfully:", JSON.stringify(result));
    producer.disconnect();
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
};

run();
