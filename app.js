const express = require('express');
const app = express();
const fs = require('fs');
const morgan = require('morgan');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

// 1 Middlewares
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('hello from the middleware 👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2. ROUTES HANDLERS
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = req.params.id;
  const tour = tours.find((el) => el.id == id);

  if (!tour) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Tour not found (Invaild Id)',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  // console.log(req.body)

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      err ? console.log(err) : console.log('success');
    }
  );

  res.status(201).json({
    status: 'success',
    tour: newTour,
  });
};

const updateTour = (req, res) => {
  const id = req.params.id;
  const tour = tours.find((el) => el.id == id);

  if (!tour) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Tour not found (Invaild Id)',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated Tour>',
    },
  });
};

const deleteTour = (req, res) => {
  const id = req.params.id;
  const tour = tours.find((el) => el.id == id);
  if (!tour) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Tour not found (Invaild Id)',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

// Users hanlder

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

// 3. ROUTES
app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);

app.route('/api/v1/user/:id').get(getUser).patch(updateUser).delete(deleteUser);

// 4. START THE SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App runnig on port ${port}`);
});
