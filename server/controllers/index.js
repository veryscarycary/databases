var models = require('../models');
var connection = require('../db/index.js').connection;
var Promise = require('bluebird');

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // seconds
};

module.exports = {
  messages: {
    get: function (req, res) {
      var getResponse = {results: []};
      connection.query('select * from messages', function(err, result) {
        if (err) { throw err; }
        result.forEach(function(msg) {
          var newMsg = {
            ObjectId: msg.id,
            createdAt: msg.createdAt,
            username: msg.userId,
            room: msg.roomId,
            text: msg.text
          };
          getResponse.results.push(newMsg);
          
        });
        res.send(getResponse);
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var roomObj = {};
      var userObj = {};
      var messageObj = {};

      roomObj['name'] = req.body.roomname;
      userObj['name'] = req.body.username;
      messageObj = {
        text: req.body.text,
        createdAt: new Date()
      };
      

      var postToServer = function () {
        connection.query('INSERT INTO rooms SET ?', roomObj, 
          function (err, result) {
            if (err) { throw err; }
            // res.send('User added to database with ID: ' + result.insertId);
          }
        );


        connection.query('INSERT INTO users SET ?', userObj, 
          function (err, result) {
            if (err) { throw err; }
            // res.send('User added to database with ID: ' + result.insertId);

          }
        );
        
        connection.query('select id from rooms where name = ?', req.body.roomname, 
          function(err, result) {
            messageObj['roomId'] = result[0]['id'];

            
          }
        );

        connection.query('select id from users where name = ?', req.body.username, 
              function(err, result) {
                messageObj['userId'] = result[0]['id'];
              }
        );

        connection.query('INSERT INTO messages SET text=?, userId=?, roomId=?, createdAt=?', [messageObj['text'], messageObj['userId'], messageObj['roomId'], messageObj['createdAt']], 
          function (err, result) {
            console.log(result);
            if (err) { throw err; }
            res.send('User added to database with ID: ' + result.insertId);

          }
        );
      };

      var promisifiedPostToServer = Promise.promisify(postToServer);
      promisifiedPostToServer();
    }, // a function which handles posting a message to the database
    options: function (req, res) {
      console.log('option');
      res.writeHead(200, headers);
      res.end();
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {
            // console.log('3')

    },
    post: function (req, res) {
      // console.log('4')

      connection.query('INSERT INTO users SET ?', req.body, 
        function (err, result) {
          if (err) { throw err; }
          res.send('User added to database with ID: ' + result.insertId);
        }
      );

      
    }
  }
};

