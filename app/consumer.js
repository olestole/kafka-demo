const { Kafka } = require("kafkajs");

const run = async () => {
  try {
    // Create a new Kafka-object
    const kafka = new Kafka({
      clientId: "my-app",
      brokers: ["localhost:9092"], // Since you're working with zookeeper, you can have multiple brokers
    });

    // Create a consumer
    const consumer = kafka.consumer({
      groupId: "test",
    });
    console.log("Connecting...");
    await consumer.connect();
    console.log("Connected");

    // Subscribe to a topic and read from the beginning of the topic
    await consumer.subscribe({
      topic: "Users",
      fromBeginning: true, 
    });

    // Consume messages
    await consumer.run({
      eachMessage: async ({ message, partition }) => {
        console.log(
          `Received message ${message.value.toString()} on partition ${partition}`
        );
      },
    });

  } catch (error) {
    console.error(error);
  }
};

run();
