#!/usr/bin/env zx
import {Kafka} from "kafkajs";

// Edit the following config if you want to use other brokers.

const configs = [
  {
    "env": "local",
    "brokers": "localhost:9092"
  },
]

// Script

console.log("Kafka producer script - 0.5.2 - mderrien");

const config = await selectConfigByEnv(configs);
const topic = await question("topic > ");
const messages = await selectMessagesToSend();

displayOptions(config.brokers, topic, messages);
await makeSureUserConsent(config.brokers, topic, messages);

await sendMessage(config.brokers, topic, messages);
console.log("Enjoy the rest of your day.")

// Functions

async function extractMessagesFromFile(filename) {
  const fileContent = await fs.readFile(filename);
  const payloads = JSON.parse(fileContent);
  return payloads.map(toKafkaMessage);
}

function toKafkaMessage(payload) {
  return {
    key: '',
    value: JSON.stringify(payload),
  };
};

async function selectConfigByEnv(configs) {
  const env = await question(`Select environment (available: ${configs.map(config => config.env)}) > `);
  const envConfig = configs.find((config) => config.env === env);
  if (!envConfig) {
    console.error("Could not find config. Aborted.");
    process.exit(1);
  }

  return envConfig;
}

async function selectMessagesToSend() {
  const filename = await question("filename (eg: messages/example.json) > ");
  const messages = await extractMessagesFromFile(filename);

  if (!messages.length) {
    console.error("Could not find messages to send.");
    process.exit(1);
  }

  return messages;
}

function displayOptions(brokers, topic, messages) {
  console.log('');
  console.log('### Please review the following informations');
  console.log('Brokers');
  console.log(`\t"${brokers}"`);
  console.log('');
  console.log('Topic');
  console.log(`\t"${topic}"`)
  console.log('');
  console.log('Number of messages');
  console.log(`\t${messages.length}`);
  console.log('###');
  console.log('');
}

async function makeSureUserConsent() {
  const shallWeContinue = await question("to continue, please type 'YES' > ");
  if (shallWeContinue !== "YES") {
    console.error("Aborted.");
    process.exit(1);
  }
}

async function sendMessage(brokers, topic, messages) {
  console.log('');
  console.log('Sending...');
  const kafka = new Kafka({
    clientId: "mderrien-producer",
    brokers: brokers.split(","),
  });

  const producer = kafka.producer();
  await producer.connect();
  const result = await producer.send({
    topic,
    messages,
  });
  await producer.disconnect();
  console.log("Sent!");

  return result;
}
