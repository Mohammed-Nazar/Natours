const fs = require('fs');


const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
  );

  const checkID =  (req, res, next, val)=>{
    const tour = tours.find((el) => el.id == req.params.id * 1);
    if (req.params.id * 1 > tours.length) {
      return res.status(404).json({
        status: 'Fail',
        message: 'Tour not found (Invaild Id)',
      });
    }
    req.tour = tour;
    next();
  }

  const checkBody = (req, res, next) => {
    const {name, price} = req.body;
    if (!name || !price) {
      return res.status(400).json({
        status: 'Fail',
        message: 'Missing name or price',
      });
    }
    next();
  }

  
  

const getAllTours = (req, res) => {
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  };
  
  const getTour = (req, res) => {
    const tour = req.tour;
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
    res.status(200).json({
      status: 'success',
      data: {
        tour: '<Updated Tour>',
      },
    });
  };
  
  const deleteTour = (req, res) => {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  };
  

  module.exports = {
    getAllTours,
    getTour,
    updateTour,
    createTour,
    deleteTour,
    checkBody,
    checkID
  }