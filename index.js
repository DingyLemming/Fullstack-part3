const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static('dist'));
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

let persons = [
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

// Generate unique ID
const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(p => p.id))
        : 0;
    return maxId + 1;
};

// Get all persons
app.get('/api/persons', (req, res) => {
    res.json(persons);
});

// Add a new person
app.post('/api/persons', (req, res) => {
    const body = req.body;

    if (!body.name || !body.number) {
        return res.status(400).json({ 
            error: 'name or number missing' 
        });
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    };

    persons = persons.concat(person);

    res.json(person);
});

// Delete a person
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);

    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});