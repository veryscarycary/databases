var db = require('../db');
var express = require('express');

console.log('running');

module.exports = {
  messages: {
    get: function (req, res) {
      res.send('messg');
    }, // a function which produces all the messages
    post: function (req, res) {
      res.send('messp');
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (req, res) {
      console.log('users get');
      res.send('userg');
    },
    post: function (req, res) {
      console.log('users post');
      res.send('userp');
    }
  }
};

