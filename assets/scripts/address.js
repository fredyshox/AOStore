import * as util from './util'

var rmAddrApi = '/api/address/rm';
var addAddrApi = '/api/address/add';

$(document).ready(function() {
  $('#address-form').submit(function(e) {
      e.preventDefault();

      var url = $(this).attr('action');
      var span = $('#info-span');
      var data = {};
      var inputs = $(this).find(":input");
      var input;
      for(var i = 0; i<inputs.length; i++) {
        input = inputs[i];
        data[input.name] = input.value;
      }

      addAddress(util.getUrl(url), data);
  });
});

$(document).ready(function() {
  $('button').filter(function(but) {
    return this.id.match(/rm[0-9]+/);
  }).each(function(index) {
    var element = $('#' + this.id);
    element.click(function() {
      var addrID = element.data("address");
      console.log(addrID);
      if (addrID !== undefined) {
        rmAddressWithID(addrID);
      }
    });
  })
});

function rmAddressWithID(id) {
  var data = {
    id: id
  }
  return rmAddress(util.getUrl(rmAddrApi), data);
}

function rmAddress(url, data) {
  return $.ajax({
    url: url,
    async: false,
    contentType:'application/json',
    data: JSON.stringify(data),
    type: 'POST',
    success: function(res){
      location.href = util.getUrl('/account/data');
    },
    error: function() {
      location.href = util.getUrl('/error');
    }
  })
}

function addAddress(url, data, onSuccess, onError) {
  return $.ajax({
      url: url,
      async: false,
      contentType:'application/json',
      data: JSON.stringify(data),
      type: 'POST',
      success: function() {
        location.href = util.getUrl('/account/data');
      },
      error: function() {
        var span = $('#info-span');
        span.text('Something went wrong. Try again.');
      }
  });
}
