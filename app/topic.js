const { Kafka } = require("kafkajs");

const run = async ()  => {
  try {
    // Create a new Kafka-object
    const kafka = new Kafka({
      clientId: "my-app",
      brokers: ["localhost:9092"] // Since you're working with zookeeper, you can have multiple brokers
    })

    // Create a admin-client
    const admin = kafka.admin();
    console.log("Connecting...")
    await admin.connect();
    console.log("Connected")

    // Create a topic with 2 partitions, A-M = 0, N-Z = 1
    await admin.createTopics({
      topics: [{
        topic: "Users",
        numPartitions: 2,
      }]
    })

    console.log("Created topic successfully")
    await admin.disconnect();
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
}

run();