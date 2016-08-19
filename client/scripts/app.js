// parses the window search bar for username
window.user = window.location.search.slice(10).replace(/%20/g, ' ');
var rooms = [];
var app = {};

var htmlEncode = function ( value ) {
  if ( value === undefined || value === null) {
    value = ' ';
  }
  if ( value.length > 100 ) {
    value = value.slice( 0, 100 );
  }
  return $('<div/>').text( value ).html();
};
// creates a chat div with children components
var Message = function (message) {
  var result = '';
  // var slicedText = message.text.slice(0, 100);
  if ( message.text === undefined ) {
    return;
  } else if ( message.text.length > 100 ) {
    message.text = message.text.slice( 0, 100 );
  }
  message.text = htmlEncode( message.text );
  message.username = htmlEncode( message.username );
  if ( app.friends[message.username] === true ) {
    result += '<div class="username friends" data-username="' + message.username + '">' + message.username + '</div>';
  } else {
    result += '<div class="username" data-username="' + message.username + '">' + message.username + '</div>';
  }
  result += '<div class="text">' + message.text + '</div>';
  result += '<div class="roomname">Chatroom: ' + message.roomname + '</div>';
  result += '<div class="time">' + $.timeago(message.createdAt) + '</div>';
  var chat = '<div class="chat">' + result + '</div>';
  return chat;
};


app.lastMessage = 0;

app.server = 'https://api.parse.com/1/classes/messages';

app.init = function () {
  app.friends = {};
  app.room = 'Lobby';
  window.rooms.push(app.room);
};

// sends message via AJAX POST
app.send = function (message) {
  $.ajax({
    url: 'https://api.parse.com/1/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

// pulls data from server using AJAX GET, called from setInterval each second
app.fetch = function () {
  var result = $.ajax({
    url: 'https://api.parse.com/1/classes/messages',
    type: 'GET',
    data: 'json',
    success: function(data) {
      if ( app.lastMessage !== data.results[0].objectId ) {
        app.clearMessages();
        app.lastMessage = data.results[0].objectId;
        for ( var i = 99; i >= 0; i-- ) {
          app.addMessage( data.results[i] );

          var roomname = data.results[i].roomname;
          // if roomname isn't in rooms array
          if (window.rooms.indexOf(roomname) === -1) {
            // add roomname to rooms array
            window.rooms.push(roomname);
            app.addRoom(roomname);
          }
        }
      }
    }
  });
  return result.responseText;
};

// clears messages from screen, called from app.fetch every second
app.clearMessages = function () {
  $('#chats').children().remove();
};

// adds new messages to screen
app.addMessage = function ( object ) {
  if ( app.room === 'All' ) {
    var message = Message( object );
    $('#chats').prepend(message);   
  } else if ( object.roomname === app.room ) {
    var message = Message( object );
    $('#chats').prepend(message);
  }
};

// needs work
app.addRoom = function (room) {
  room = htmlEncode( room );
  var roomName = '<option value="' + room + '">' + room + '</option>';
  $('#roomSelect').append(roomName);
};


app.selectRoom = function (room) {
  if ( room ) {
    app.room = room;
    $('#roomSelect').val(room);
  }
  app.room = $('#roomSelect :selected').text();
}; 

// needs work
app.addFriend = function ( username ) {
  if ( username !== undefined ) {
    app.friends[username] = !app.friends[username];
  }
};

// calls app.send
app.handleSubmit = function (text) {
  app.send({username: window.user, text: text, roomname: app.room});
  //need to update roomname
};

// html-encodes inputs from users

$(document).ready( function () {

  app.init();

  $('body').on('click', '.username', function () {
    // debugger;
    var username = $(this).text();
    console.log(username);
    $('[data-username="' + username + '"]').toggleClass('friends');
    app.addFriend( username );
  });

  $('body').on('click', '.submit', function () {
    if ( $('#message-box').val().length === 0 ) { return; }
    // var text = htmlEncode( $('#message-box').val());
    var text = $('#message-box').val();
    $('#message-box').val('');
    app.handleSubmit(text);
    //need to update roomname
  });

  $('body').on('keypress', function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      // var text = htmlEncode( $('#message-box').val());
      var text = $('#message-box').val();
      $('#message-box').val('');
      app.handleSubmit(text);
      //need to update roomname
    }
  });

  $('#roomSelect').on('change', function(e) {
    e.stopPropagation();
    var val = $('#roomSelect').prop('selectedIndex');
    if ( val === 1) {
      var room = prompt('Enter a new chat room name');

      if (window.rooms.indexOf(room) === -1) {
        window.rooms.push(room);
        app.addRoom(room);
      }
    }
    app.selectRoom( room );
  });

  // calls app.fetch every second
  setInterval(function() {
    app.selectRoom();
    app.fetch();
  }, 1000);
 
});