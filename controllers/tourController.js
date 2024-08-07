const Tour = require('../models/tourModel');
const QueryFactory = require('../utils/queryFactory');

const aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

const getAllTours = async (req, res) => {
  try {
    const queryFactory = new QueryFactory(Tour.find(), req.query);

    queryFactory.filter().sort().limitFields().paginate();

    const countDocuments = await Tour.countDocuments();
    const tours = await queryFactory.query;

    if (
      req.query.page &&
      (req.query.page * 1 - 1) * (req.query.limit * 1) >= countDocuments
    ) {
      throw new Error('This page does not exist');
    }

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err.message || 'No tours found!',
    });
  }
};

const getTour = async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await Tour.findById(id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: 'No tour found with that ID',
    });
  }
};

const createTour = async (req, res) => {
  const tour = req.body;
  try {
    const newTour = await Tour.create(tour);
    res.status(201).json({
      status: 'success',
      tour: newTour,
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: 'Invalid data sent!',
    });
  }
};

const updateTour = async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  }
};

const deleteTour = async (req, res) => {
  const { id } = req.params;
  try {
    await Tour.findByIdAndDelete(id);
    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: 'No tour found with that ID',
    });
  }
};

module.exports = {
  getAllTours,
  getTour,
  updateTour,
  createTour,
  deleteTour,
  aliasTopTours,
};
