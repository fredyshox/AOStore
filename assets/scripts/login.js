import * as util from './util'

var userStorageKey = 'aos_user';
var sessionApiUrl = '/api/session'

$(document).ready(function() {
  console.log('ready');

  var element = $('#login-form');
  element.submit(function(event) {
    event.preventDefault();

    var span = element.find("span");
    validateEntry(element, function(username, password) {
      login(element, username, password);
    }, function (err) {
      console.log(err);
      span.text('Type in email & password');
    })
  });
});

$(document).ready(function() {
  console.log('ready2')
  var element = $('#register-form');
  element.submit(function(event) {
    event.preventDefault();
    var span = element.find("span");
    validateEntry(element, function(username, password) {
      register(element, username, password);
    }, function(err) {
      console.log(err);
      span.text('Type in email & password');
    });
  });
});

function validateEntry(element, onSuccess, onError) {
  var username = element.find("input[name='email']").val();
  var password = element.find("input[name='password']").val();
  if (password.length !== 0 && username.length !== 0) {
    onSuccess(username, password);
  }else {
    onError('Empty input fields.');
  }
}

function register(element, username, password) {
  var errSpan = $('#error-span');
  var succSpan = $('#success-span');
  onLogin([sessionApiUrl, 'register'].join('/'), username, password, function(result) {
    console.log("result: " + result);
    succSpan.text("Success. You can now login.")
  }, function(err) {
    console.log(err);
    errSpan.text("Error. Try again");
  });
}

function login(element, username, password) {
  onLogin([sessionApiUrl, 'authenticate'].join('/'), username, password, function(result) {
    console.log('Received response: ' + result);
    localStorage.setItem(userStorageKey, result);

    window.location.replace(util.getUrl('/'));
  }, function(err) {
    var span = element.find("span");
    span.text('Email & Password do not match');
  });
};

function onLogin(url, email, password, onSuccess, onError) {
  $.ajax({
      url: url,
      async: true,
      contentType:'application/json',
      dataType: 'json',
      data: JSON.stringify({
        email: email,
        password: password
      }),
      type: 'POST',
      success: onSuccess,
      error: onError
  });
}
