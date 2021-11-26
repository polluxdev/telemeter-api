const mqtt = require('mqtt')

const config = require('../config')

const Device = require('../database/models/device')
const Meter = require('../database/models/meter')

const { deviceCode } = require('./generator')

const meterProps = ['vs', 'bs', 'ct', 'ch', 'wu']

class MqttHandler {
  constructor() {
    this.mqttClient = null
    this.host = config.antares.ANTARES_MQTT_HOST
    this.port = config.antares.ANTARES_MQTT_PORT
    this.model = {}
    this.deviceCode = null
  }

  connect() {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    this.mqttClient = mqtt.connect(`mqtt://${this.host}:${this.port}`)

    // Mqtt error calback
    this.mqttClient.on('error', (err) => {
      console.log(err)
      this.mqttClient.end()
    })

    // Connection callback
    this.mqttClient.on('connect', () => {
      console.log(`mqtt client connected`)
    })

    // mqtt subscriptions
    this.mqttClient.subscribe(
      config.antares.ANTARES_MQTT_TOPIC_RESP,
      function () {
        console.log(
          `Subscribe to topic ${config.antares.ANTARES_MQTT_TOPIC_RESP}`
        )
      }
    )

    // When a message arrives, console.log it
    this.mqttClient.on('message', async (topic, payload) => {
      console.log('Received Message:', payload.toString())
      const res = JSON.parse(payload.toString())
      const pc = res['m2m:rsp']['pc']
      if (!pc.hasOwnProperty('m2m:cin')) {
        return
      }
      const data = pc['m2m:cin']
      const meter = JSON.parse(data['con'])

      Object.assign(this.model, meter)
      this.deviceCode = deviceCode(data, 'pi')

      let all = meterProps.every((el) => this.model.hasOwnProperty(el))

      if (all) {
        await Device.findOne({ code: this.deviceCode }).then(async (device) => {
          return await Meter.create({
            device: device.id,
            user: device.user,
            valveStat: meter.vs,
            batteryStat: meter.bs,
            waterUsage: meter.wu,
            currentTemperature: meter.ct,
            currentHumidity: meter.ch
          }).then((meter) => {
            console.log(`Save Meter Successfully:`, meter)
            this.model = {}
          })
        })
      }
    })

    this.mqttClient.on('close', () => {
      console.log(`mqtt client disconnected`)
    })
  }

  // Sends a mqtt message to topic: mytopic
  sendMessage(message) {
    this.mqttClient.publish(config.antares.ANTARES_MQTT_TOPIC_REQ, message)
  }
}

module.exports = MqttHandler
