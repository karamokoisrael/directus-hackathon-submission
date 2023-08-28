require('dotenv').config()
const config = {
  environments: [
    {
      name: "dev",
      endpoint: process.env.DEV_SERVER_URL,
      accessToken: process.env.DEV_SERVER_TOKEN,
    },
    {
      name: "prod",
      endpoint: process.env.PROD_SERVER_URL,
      accessToken: process.env.PROD_SERVER_TOKEN,
      production: true,
    },
  ],
};
module.exports = config;
