const { Kafka } = require("kafkajs");
const msg = process.argv[2];

const run = async () => {
  try {
    const kafka = new Kafka({
      clientId: "my-app",
      brokers: ["localhost:9092"], // Since you're working with zookeeper, you can have multiple brokers
    });

    const consumer = kafka.consumer({
      groupId: "test",
    });
    console.log("Connecting...");
    await consumer.connect();
    console.log("Connected");

    await consumer.subscribe({
      topic: "Users",
      fromBeginning: true, // Read from the beginning of the topic. If you don't care about old messages -> False
    });

    await consumer.run({
      eachMessage: async ({ topic, message, partition }) => {
        console.log(
          `Received message ${message.value.toString()} on partition ${partition}`
        );
      },
    });

  } catch (error) {
    console.error(error);
    // await consumer.disconnect();
  }
};

run();
