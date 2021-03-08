import express from 'express';
const app = express();
app.use(express.json());

const cars = [
  {
    id: 1,
    model: 'Toyota',
  },
  {
    id: 2,
    model: 'Mercedes',
  },
  {
    id: 3,
    model: 'BMW',
  },
  {
    id: 4,
    model: 'Mazeratti',
  },
];

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/api/cars', (req, res) => {
  res.send(['Toyota', 'Mercedes', 'BMW', 'Mazeratti']);
});

app.get('/api/cars/:id', (req, res) => {
  const id = req.params.id;
  const car = cars.find((car) => car.id === parseInt(id));
  //   res.send(req.query);
  if (!car) {
    return res.status(404).send(`Error - car with id ${id} not found`);
  }
  res.send(car);
});

app.post('/api/cars', (req, res) => {
  if (!req.body.model) {
    return res.status(400).send('Send model prop');
  }
  const car = {
    id: cars.length + 1,
    model: req.body.model,
  };

  cars.push(car);
  res.send(car);
});

app.put('/api/cars/:id', (req, res) => {
  const id = req.params.id;
  const car = cars.find((car) => car.id === parseInt(id));
  if (!car) {
    return res.status(404).send(`Error - car with id ${id} not found`);
  }
  car.model = req.body.model;
  res.send(car);
});

app.delete('/api/cars/:id', (req, res) => {
  const id = req.params.id;
  const car = cars.find((car) => car.id === parseInt(id));
  if (!car) {
    return res.status(404).send(`Error - car with id ${id} not found`);
  }
  const index = cars.indexOf(car);
  cars.splice(index, 1);

  res.send(car);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
