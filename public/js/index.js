var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  var formattedTime= moment(message.createAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template,{
    text:message.text,
    from:message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);

});

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createAt).format('h:mm a');

  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template,{
    from:message.from,
    createdAt: formattedTime,
    url:message.url
  });
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">내 현재 위치</a>');

  // li.text(`${message.from}: ${formattedTime}`);
  // a.attr('href', message.url);
  // li.append(a);
  jQuery('#messages').append(html);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  let messageTextBox = jQuery('[name=message]')
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function () {
    messageTextBox.val('')
  });
});


const locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Your browser not support geolocation');
  }


  locationButton.attr('disabled','disabled').text('위치 보내기..');

  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled');
    alert('Unable to get current location');
  });
});