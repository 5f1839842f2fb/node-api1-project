const express = require('express')
const server = express()
const PORT = 3000;

let starterData = [
  {
  id: "0",
  name: "Jane Doe", // String, required
  bio: "Not Tarzan's Wife, another Jane",  // String, required
  },
  {
    id: "1",
    name: "John Doe", // String, required
    bio: "asdasdasdasdasd",  // String, required
  }
]

server.use(express.json())

server.get('/api/users', (req, res) => {
  res.status(200).json(starterData)
})

server.get('/api/users/:id', (req, res) => {
  if (starterData.some(element => element.id === req.params.id)) {
    const element = starterData.filter(element => element.id === req.params.id)
    res.status(200).json(element)
  } else {
    res.status(400).json(starterData)
  }
})

server.post('/api/users', (req, res) => {
  if("name","bio" in req.body) {
    starterData.push(req.body)
    res.status(200).json(starterData)
  } else {
    res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
  }
})

server.delete('/api/users/:id', (req, res) => {
  if (starterData.some(element => element.id === req.params.id)) {
    starterData = starterData.filter(element => element.id !== req.params.id)
    res.status(200).json(starterData)
  } else {
    res.status(400).json(starterData)
  }
})

server.patch('/api/users/:id', (req, res) => {
  if (starterData.some(element => element.id === req.params.id)) {
    const newObj = Object.assign(starterData.find(element => element.id === req.params.id), req.body)
    starterData = starterData.filter(element => element.id !== req.params.id)
    starterData.push(newObj)
    res.status(200).json(starterData)
  } else {
    res.status(400).json(starterData)
  }
})

server.listen(PORT, () => {
  console.log(`listening on localhost:${PORT}`)
})