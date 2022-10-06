const mongoose = require('mongoose');
const Joi = require('joi');
require('dotenv').config({ path: __dirname + '/../.env' });

const paymentSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  type: {
    type: String,
    required: true,
    enum: ["SHARED", "SINGLE"]
  },
  sharedWith: {
    type: []
  },
  timeStamp: {
    type: Date,
    required: true
  }
})

const Payment = mongoose.model('Payment', paymentSchema);

function validatePayment(payment) {
  const schema = Joi.object({
    userId: Joi.string().hex().length(24).required(),
    amount: Joi.number().min(0).required(),
    type: Joi.string().valid('SHARED', 'SINGLE').required(),
    sharedWith: Joi.array(),
    timeStamp: Joi.date().required()
  });
  return schema.validate(payment);
}

exports.Payment = Payment;
exports.validate = validatePayment;
