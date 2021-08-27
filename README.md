# kafkajs-producer

> small script to produce messages manually using kafkajs. It uses [Zx](https://github.com/google/zx).

## Setup

Make sure you have `Zx` installed.

install package `kafkajs` using your favorite package manager.

Create config file `config.js` which exports `configs` with this structure :

```
export const configs = [
  {
    env: "qa",
    brokers: "",
  },
  {
    env: "preprod",
    brokers: "",
  },
  {
    env: "prod",
    brokers: "",
  }
];
```

then run the script : 

```
./send.mjs
```
