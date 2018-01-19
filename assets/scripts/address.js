import * as util from './util'

var rmAddrApiUrl = '/api/address/rm';
var addAddrApiUrl = '/api/address/add';

$(document).ready(function() {
  $('#address-form').submit(function(e) {
      e.preventDefault();

      var span = $('#info-span');
      var data = {};
      var inputs = $(this).find(":input");
      var input;
      for(var i = 0; i<inputs.length; i++) {
        input = inputs[i];
        data[input.name] = input.value;
      }

      addAddress(util.getUrl(addAddrApiUrl), data);
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
        rmAddress(util.getUrl(rmAddrApiUrl), {
          id: addrID
        });
      }
    });
  })
});

function rmAddress(url, data) {
  return util.httpPost(url, data, function(res) {
    location.href = util.getUrl('/account/data');
  }, function() {
    location.href = util.getUrl('/error');
  })
}

function addAddress(url, data) {
  return util.httpPost(url, data, function(res) {
    location.href = util.getUrl('/account/data');
  }, function(err) {
    var span = $('#info-span');
    span.text('Something went wrong. Try again.');
  });
}
