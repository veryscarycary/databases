var models = require('../models');
var connection = require('../db/index.js').connection;
var Promise = require('bluebird');

console.log('top')
module.exports = {
  messages: {
    get: function (req, res) {
      // console.log('1')
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var roomObj = {};
      var userObj = {};
      var messageObj = {};

      roomObj['name'] = req.body.room;
      userObj['name'] = req.body.username;
      messageObj = {
        text: 'hello',
        createdAt: new Date(),
        roomId: 1,
        userId: 1
      };
      

      var postToServer = function () {
        connection.query('INSERT INTO rooms SET ?', roomObj, 
          function (err, result) {
            if (err) throw err;
            console.log('1')
            // res.send('User added to database with ID: ' + result.insertId);
          }
        );


        connection.query('INSERT INTO users SET ?', userObj, 
          function (err, result) {
            if (err) throw err;
            // res.send('User added to database with ID: ' + result.insertId);
                        console.log('2')

          }
        );
        
        connection.query('select id from rooms where name = ?', req.body.room, 
          function(err, result) {
            console.log(result[0]['id'], 'room!!!!!')
            // messageObj['roomId'] = result[0]['id'];
                        console.log('3')

            
          }
        );

        connection.query('select id from users where name = ?', req.body.username, 
              function(err, result) {
                var result = ' ' + result;
                console.log(result, 'user!!!!!')
                // messageObj['userId'] = result[0]['id'];
                            console.log('4')

                console.log(result, 'res')
              }
        );

        connection.query('INSERT INTO messages SET ?', messageObj, 
          function (err, result) {
            if (err) { throw err; }
            res.send('User added to database with ID: ' + result.insertId);
                        console.log('5')

          }
        );
      };

      var promisifiedPostToServer = Promise.promisify(postToServer);
      console.log('PROMISIFYYYY', promisifiedPostToServer);
      promisifiedPostToServer();
    } // a function which handles posting a message to the database
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
          if (err) throw err;
          res.send('User added to database with ID: ' + result.insertId);
        }
      );

      
    }
  }
};

