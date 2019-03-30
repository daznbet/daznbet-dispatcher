const uuid = require('uuid')
const Producer = require('sqs-producer')

const events = [
  { time: 1, payload: { message: '1' } },
  { time: 4, payload: { message: '4' } },
  { time: 5, payload: { message: '5' } },
  { time: 7, payload: { message: '7' } },
  { time: 14, payload: { message: '14' } },
]

const realEvents = [
  {
    time: '1:37:17,
    message: 'startGame',
  },
  {
    time: '1:37:20',
    message: 'pass'
    team: 'Empoli'
    player: 22
  },
  {
    time: '1:37:22',
    message: 'pass'
    team: 'Empoli',
    player: 3
  },
  {
    time: '1:37:29',
    message: 'pass'
    team: 'Juventus',
    player: ''
  },
  {
    time: '1:37:38',
    message: 'pass'
    team: 'Juventus',
    player: ''
  },
  {
    time: '1:37:42',
    message: 'pass'
    team: 'Juventus',
    player: ''
  },
  {
    time: '1:37:46
    message: 'pass'
    team: 'Juventus',
    player: ''
  },
  {
    time: '1:37:51'
    message: 'pass'
    team: 'Juventus',
    player: ''
  },
  {
    time: '1:37:53'
    message: 'pass'
    team: 'Juventus',
    player: ''
  },
  {
    time: '1:37:57'
    message: 'pass'
    team: 'Juventus',
    player: ''
  },
  {
    time: '1:38:16'
    message: 'pass'
    team: 'Juventus',
    player: ''
  },
  {
    time: '1:38:19'
    message: 'pass'
    team: 'Juventus',
    player: ''
  },
  {
    time: '1:38:20'
    message: 'pass'
    team: 'Juventus',
    player: ''
  },
  {
    time: '1:38:25'
    message: 'pass'
    team: 'Empoli',
    player: ''
  },
  {
    time: '1:38:27'
    message: 'pass'
    team: 'Empoli',
    player: ''
  },
  {
    time: '1:38:32'
    message: 'pass'
    team: 'Juventus',
    player: ''
  },
  {
    time: '1:38:38'
    message: 'shotOnTarget'
    team: 'Juventus',
    player: ''
  },
  {
    time: '1:38:53'
    message: 'pass'
    team: 'Empoli',
    player: ''
  },
  {
    time: '1:38:55'
    message: 'pass'
    team: 'Empoli',
    player: ''
  },
  {
    time: '1:38:57'
    message: 'pass'
    team: 'Empoli',
    player: ''
  },
  {
    time: '1:39:00'
    message: 'pass'
    team: 'Empoli',
    player: ''
  },
  {
    time: '1:39:02'
    message: 'pass'
    team: 'Empoli',
    player: ''
  },
  {
    time: '1:39:15'
    message: 'pass'
    team: 'Juventus',
    player: ''
  },
  {
    time: '1:39:18'
    message: 'pass'
    team: 'Juventus',
    player: ''
  },
  {
    time: '1:39:20'
    message: 'pass'
    team: 'Juventus',
    player: ''
  },
  {
    time: '1:39:23'
    message: 'pass'
    team: 'Juventus',
    player: ''
  },
  {
    time: '1:39:25'
    message: 'pass'
    team: 'Juventus',
    player: ''
  },
  {
    time: '1:39:29'
    message: 'pass'
    team: 'Juventus',
    player: ''
  },
  {
    time: '1:39:31'
    message: 'goal'
    team: 'Juventus',
    player: ''
  },
  {
    time: '1:39:33'
    message: 'endGame'
    team: 'Juventus',
    player: ''
  },
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
