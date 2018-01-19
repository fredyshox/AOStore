$(document).ready(function() {
  var total = 0;
  $('#cart-tbody').find('tr').each(function(i) {
    var $tds = $(this).find('td');
    var price = parseFloat($tds.eq(1).text());
    total += price;
  });

  $('#cart-sum').text('Total: ' + total.toFixed(2) + ' EUR');
});
