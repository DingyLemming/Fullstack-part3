const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3001

 const date = new Date();
 
 app.use(cors());
 app.use(express.json());
 app.use(morgan('tiny'));

const persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-1456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
              <p>${date}</p>`);
});

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.find(person => person.id === id);
    if (!person) {
      res.status(404).send(`Person ${id} not found`);
    }
    res.json(person);
});

app.post('/api/persons', (req, res) => {
    const body = req.body;
    if (!body.name || !body.number) {
      return res.status(400).send('Name or number missing');
    }
    if (persons.find(person => person.name === body.name)) {
      return res.status(400).send('Name must be unique');
    }
    const person = {
      id: Math.floor(Math.random() * 1000),
      name: body.name,
      number: body.number
    };
    persons.push(person);
    res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const personIndex = persons.findIndex(person => person.id === id);
  if (personIndex === -1) {
    return res.status(404).send(`Person ${id} not found`);
  }
  persons.splice(personIndex, 1);
  res.send(`Person ${id} was deleted`);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/api/persons`);
});