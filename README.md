# Demo of Kafka

Demo of Kafka for a presentation in Internet of Things, University of Bologna 2022. 
The project leverages `kafkajs` together with docker-images of `kafka` and `zookeeper` in order to quickly demostrate how a topic can be created, how a producer can send messages to the topic and how a consumer can consume the messages.

Inspiration from [Hussein Nasser's YouTube tutorial](https://www.youtube.com/watch?v=R873BlNVUB4)

## Getting Started

### Prerequisites

- Docker
- Docker compose
- Node

## Usage

- Start the docker-containers
  ```sh
  $ docker-compose up
  ```
- Install dependencies
  ```sh
  $ cd kafka-demo
  $ npm install
  ```
- Create a topic
  ```sh
  $ node topic.js
  ```
- Create and run a consumer
  ```sh
  $ node consumer.js
  ```
- In another terminal, create a producer and send messages
  ```sh
  $ node producer.js <Your message>
  ```