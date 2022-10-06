const express = require('express');
const error = require('../middlewares/error');
const users = require('../routes/users');
const payments = require('../routes/payments');
const auth = require('../routes/auth');

module.exports = function(app) {
  // Middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));

  // Routes
  app.use('/api/users', users);
  app.use('/api/payments', payments);
  app.use('/api/auth', auth);
  app.use(error);
}
