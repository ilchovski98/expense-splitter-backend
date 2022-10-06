const auth = require('../middlewares/auth');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { Payment, validate } = require('../models/payment');
const { asyncMiddleware } = require('../middlewares/async');


router.get('/me', auth, asyncMiddleware(async (req, res) => {
  const result = await Payment.find({ userId: req.user._id });
  res.send({payments: result});
}));

// read
router.get('/', asyncMiddleware(async (req, res) => {
  const payments = await Payment.find({});
  res.send(payments);
}));

// create
router.post('/create', auth, asyncMiddleware(async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({message: error.details[0].message});

  const payment = new Payment(_.pick(req.body, ['userId', 'amount', 'type', 'sharedWith', 'timeStamp']));

  const result = await payment.save();

  res.send({result});
}));

// update
// delete

module.exports = router;
