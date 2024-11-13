import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import Person from './models/person.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('dist'));
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

// Get all persons
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons);
  });
});

// Add a new person
app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ 
      error: 'name or number missing' 
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then(savedPerson => {
    res.json(savedPerson);
  });
});

// Delete a person
app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch(error => {
      res.status(500).json({ error: 'failed to delete person' });
    });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});