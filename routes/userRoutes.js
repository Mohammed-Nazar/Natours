const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userController');

router.param('id', (req, res, next, val)=>{
    console.log(`The value of id is ${val}`);
    next();
})

router
  .route('/')
  .get(userControllers.getAllUsers)
  .post(userControllers.createUser);
router
  .route('/:id')
  .get(userControllers.getUser)
  .patch(userControllers.updateUser)
  .delete(userControllers.deleteUser);

module.exports = router;
