const uuid = require('uuid')
const Producer = require('sqs-producer')
const moment = require('moment')
const events = require('./data')


const producer = Producer.create({
  queueUrl: `https://sqs.us-east-1.amazonaws.com/374047294805/daznbet-events`,
  region: 'us-east-1'
})

const getTime = (strHour) =>  moment(strHour, 'h:mm:ss')

const calculateDiff = (startTime) => (time) => moment.duration(time.diff(startTime.diff(1000))).asSeconds()

const dispatcher = (events) => {
  const epoch = Date.now()
  let lastTime = 0
  const start = getTime(events[0].time)
  const diffFromStart = calculateDiff(start)

  setInterval(() => {
    const messages = events
      .filter(e => diffFromStart(getTime(e.time)) >= lastTime && diffFromStart(getTime(e.time)) < (Date.now() - epoch) / 1000)
      .map(e => ({ id: uuid(), body: JSON.stringify(e.payload) }))

    if (messages && messages.length !== 0) {
      console.log(messages)
      producer.send(messages, () => { })
    }

    lastTime = (Date.now() - epoch) / 1000
  }, 1000);
}

dispatcher(events)