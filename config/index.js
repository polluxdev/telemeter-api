require('dotenv').config()

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  APP_NAME: process.env.APP_NAME,
  DOMAIN_APP: process.env.DOMAIN_APP,
  API_VERSION: process.env.API_VERSION,
  PORT: process.env.PORT,
  MAX_RATE_LIMIT: process.env.MAX_RATE_LIMIT,
  RESET_RATE_INTERVAL: process.env.RESET_RATE_INTERVAL,
  mongo: {
    MONGO_LOCAL_URI: process.env.MONGO_LOCAL_URI,
    MONGO_DOCKER_URI: process.env.MONGO_DOCKER_URI,
    MONGO_ATLAS_URI: process.env.MONGO_ATLAS_URI,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PW: process.env.MONGO_PW
  },
  jwt: {
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_EXPIRED_TIMEOUT: process.env.JWT_EXPIRED_TIMEOUT,
    JWT_COOKIE_EXPIRED_TIMEOUT: process.env.JWT_COOKIE_EXPIRED_TIMEOUT
  },
  antares: {
    ANTARES_ACCESS_KEY: process.env.ANTARES_ACCESS_KEY,
    ANTARES_APPLICATION_NAME: process.env.ANTARES_APPLICATION_NAME,
    ANTARES_URL: process.env.ANTARES_URL,
    ANTARES_MQTT_HOST: process.env.ANTARES_MQTT_HOST,
    ANTARES_MQTT_PORT: process.env.ANTARES_MQTT_PORT,
    ANTARES_MQTT_TOPIC_RESP: process.env.ANTARES_MQTT_TOPIC_RESP,
    ANTARES_MQTT_TOPIC_REQ: process.env.ANTARES_MQTT_TOPIC_REQ
  },
  mail: {
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_PORT: process.env.MAIL_PORT,
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD
  }
}
