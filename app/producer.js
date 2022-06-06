const { Kafka } = require("kafkajs");
const msg = process.argv[2];

const run = async () => {
  try {
    const kafka = new Kafka({
      clientId: "my-app",
      brokers: ["localhost:9092"], // Since you're working with zookeeper, you can have multiple brokers
    });

    const producer = kafka.producer();
    console.log("Connecting...");
    await producer.connect();
    console.log("Connected");

    const partition = msg[0] < "N" ? 0 : 1;
    const result = await producer.send({
      topic: "Users",
      messages: [
        {
          value: msg,
          partition: partition, // A-M = 0, N-Z = 1
        },
      ],
    });
    console.log("Send successfully", JSON.stringify(result));

    producer.disconnect();
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
};

run();
