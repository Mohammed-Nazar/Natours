const express = require('express');
const router = express.Router();
const tourController = require('./../controllers/tourController');
const fs = require('fs')

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
  );

router.param('id', tourController.checkID);




 
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody ,tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
