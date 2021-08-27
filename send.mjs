#!/usr/bin/env zx
import { Kafka } from "kafkajs";
import { configs } from "./config";

console.log("Kafka producer script - 0.0.1 - mderrien");

const env = await question("env (qa/preprod/prod) > ");
const envConfig = getConfigByEnv(env);
if (!envConfig) {
  console.log("Could not find config. Aborted.");
  process.exit(1);
}

const topic = await question("topic > ");
const filename = await question("filename > ");
const fileContent = await fs.readFile(filename);
const shallWeContinue = await question("to continue, please type 'YES' > ");

if (shallWeContinue !== "YES") {
  console.log("Aborted.");
  process.exit(1);
}

const result = await sendMessage();
console.log(
  `Pushed to ${result[0].topicName} - partition ${result[0].partition} - offset ${result[0].baseOffset}`
);
console.log("done.");
console.log("have a nice day !");

function getConfigByEnv(env) {
  return configs.find((config) => config.env === env);
}

async function sendMessage() {
  const kafka = new Kafka({
    clientId: "mderrien-producer",
    brokers: envConfig.brokers.split(","),
  });

  const producer = kafka.producer();
  await producer.connect();
  const result = await producer.send({
    topic,
    messages: [{ value: fileContent }],
  });
  await producer.disconnect();
  return result;
}
