import * as util from './util'

var orderApiUrl = '/api/orders'

$(document).ready(function() {
  $('#delivery-form').submit(function(e) {
    e.preventDefault();

    var deliveryID = $(this).find("input[name='deliveryID']:checked").val();
    var addressID = $('#addressSelect option:selected').val();

    order({
      deliveryID: deliveryID,
      addressID:addressID
    })
  })
})

function order(data) {
  util.httpPost(util.getUrl(orderApiUrl), data, function(res) {
    console.log('success')
    location.href = util.getUrl('/account/orders');
  }, function() {
    console.log('failure')
    location.href = util.getUrl('/error');
  });
}
