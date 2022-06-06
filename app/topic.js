const { Kafka } = require("kafkajs");

const run = async ()  => {
  try {
    const kafka = new Kafka({
      clientId: "my-app",
      brokers: ["localhost:9092"] // Since you're working with zookeeper, you can have multiple brokers
    })

    const admin = kafka.admin();
    console.log("Connecting...")
    await admin.connect();
    console.log("Connected")

    // Create a topic
    await admin.createTopics({
      topics: [{
        topic: "Users",
        numPartitions: 2, // A-M, N-Z
      }]
    })

    console.log("Created successfully")
    await admin.disconnect();

  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
}

run();