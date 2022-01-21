# kafkajs-producer

> small script to produce messages manually using kafkajs. It uses [Zx](https://github.com/google/zx) and [KafkaJS](https://github.com/tulios/kafkajs).

Sometimes, you need to manually produce some messages in a KafkaJS topic. Sometimes, you need to produce a lot of messages. This script allows you to write a simple JSON file, and to push it to a topic. You can save multiple environments in the config, so you can try your script in local before pushing to production.

## Setup

As usual, install deps (it's only kafkajs and zx) :

```
npm install
```

Update configs in `index.mjs` :

```
const configs = [
  {
    env: "local",
    brokers: "broker1.com,broker2.com,broker3.com",
  },
  {
    env: "qa",
    brokers: "broker1.com,broker2.com,broker3.com",
  },
  {
    env: "prod",
    brokers: "broker1.com,broker2.com,broker3.com",
  }
];
```

create a JSON file containing your payloads in an array (see example.json).

Then run the script : 

```
npm run start
```
