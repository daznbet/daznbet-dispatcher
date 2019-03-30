const uuid = require('uuid')
const Producer = require('sqs-producer')

const events = [
  { time: 1, payload: { message: '1' } },
  { time: 4, payload: { message: '4' } },
  { time: 5, payload: { message: '5' } },
  { time: 7, payload: { message: '7' } },
  { time: 14, payload: { message: '14' } },
]

const producer = Producer.create({
  queueUrl: `https://sqs.us-east-1.amazonaws.com/374047294805/daznbet-events`,
  region: 'us-east-1'
})

const dispatcher = (events) => {
  const epoch = Date.now()
  let lastTime = 0

  setInterval(() => {
    const messages = events
      .filter(e => e.time >= lastTime && e.time < (Date.now() - epoch) / 1000)
      .map(e => ({ id: uuid(), body: JSON.stringify(e.payload) }))
    if (messages && messages.length !== 0) {
      producer.send(messages, () => { })
    }
    lastTime = (Date.now() - epoch) / 1000
  }, 1000);
}

dispatcher(events)
