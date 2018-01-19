import * as util from './util'

var adminProductsApi = '/api/admin/products';
var adminCategoryApi = '/api/admin/categories';
var adminDeliveryApi = '/api/admin/deliverers';
var adminUsersApi = '/api/admin/permissions';
var adminOrdersApi = '/api/admin/orders';

//deliverers
$(document).ready(function() {
  $('#add-delivery-form').submit(function(e) {
    e.preventDefault();

    var data = util.inputData(this);
    addDelivery(data);
  });

  $('#rm-delivery-form').submit(function(e) {
    e.preventDefault();

    var data = util.inputData(this);
    rmDelivery(data);
  })

  // $('#up-delivery-form').submit(function(e) {
  //   e.preventDefault();
  //
  //   var data = util.inputData(this);
  //   upDelivery(data);
  // })
});


var addDelivery = function(data) {
  var url = util.getUrl(adminDeliveryApi)
  util.httpPost(url, data, function(res) {
    $('#add-del-suc').text('Success: added deliverer');
  }, function(err) {
    $('#add-del-err').text('Error: Unable to add deliverer.');
  });
};

var rmDelivery = function(data) {
  var url = util.getUrl(adminDelivererApi + '/' + data['ID']);
  util.httpPost(url, {}, function(res) {
    $('#rm-del-suc').text('Success: removed deliverer')
  }, function(err) {
    $('#rm-del-err').text('Error: Unable to remove deliverer')
  });
};

var upDelivery = function(data) {
  var url = util
  util.httpPost(url, data, function(res) {
    $('#up-del-suc').text('Success: updated');
  }, function(err) {
    $('#up-del-err').text('Error: unable to update');
  });
};

//categories

$(document).ready(function() {
  $('#add-category-form').submit(function(e) {
    e.preventDefault();

    var data = util.inputData(this);
    addCategory(data);
  });

  $('#rm-category-form').submit(function(e) {
    e.preventDefault();

    var data = util.inputData(this);
    rmCategory(data);
  });

  $('#up-category-form').submit(function(e) {
    e.preventDefault();

    var data = util.inputData(this);
    upCategory(data);
  });
});

var addCategory = function(data) {
  var url = util.getUrl(adminCategoryApi);
  util.httpPost(url, data, function(res) {
    $('#add-cat-suc').text('Success: added');
  }, function(err) {
    $('#add-cat-err').text('Error: unable to add');
  });
};

var rmCategory = function(data) {
  var url = util.getUrl(adminCategoryApi + '/' + data['ID']);
  util.httpPost(url, data, function(res) {
    $('#rm-cat-suc').text('Success: removed');
  }, function(err) {
    $('#rm-cat-err').text('Error: unable to remove');
  });
};

var upCategory = function(data) {
  var url = util.getUrl(adminCategoryApi + '/' + data.ID + '?update=' + 1);
  util.httpPost(url, data, function(res) {
    $('#up-cat-suc').text('Success: updated');
  }, function(err) {
    $('#up-cat-err').text('Error: unable to update');
  });
};

//Products

$(document).ready(function() {
  $('#rm-product-form').submit(function(e) {
    e.preventDefault();

    var data = util.inputData(this);
    rmProduct(data);
  });

  $('#add-product-form').submit(function(e) {
    e.preventDefault();

    var data = util.inputData(this);
    addProduct(data);
  });

});

var addProduct = function(data) {
  var url = util.getUrl(adminProductsApi);
  util.httpPost(url, data, function(res) {
    $('#add-prod-suc').text('Success: added');
  }, function(err) {
    $('#add-prod-err').text('Error: unable to add');
  });
};

var rmProduct = function(data) {
  var url = util.getUrl(adminProductsApi + '/' + data.ID);
  util.httpPost(url, data, function(res) {
    $('#rm-prod-suc').text('Success: removed');
  }, function(err) {
    $('#rm-prod-err').text('Error: unable to remove');
  });
};

//Permissions

$(document).ready(function() {
  $('#permissions-form').submit(function(e) {
    e.preventDefault();

    var userID = $(this).find("input[name='userID']").val();
    var permission = $(this).find("input[name='permissionOption']:checked").val();

    var data = {
      ID: userID,
      permissions: permission
    }

    upPermissions(data);
  })
});

var upPermissions = function(data) {
  var url = util.getUrl(adminUsersApi + '/' + data.ID);
  util.httpPost(url, data, function(res) {
    $('#up-perm-suc').text('Success: updated');
  }, function(err) {
    $('#up-perm-err').text('Error: unable to update');
  });
}

//Orders

$(document).ready(function() {
  $('button[id^="button-confirm"]').click(function() {
    var orderID = this.value;

    var data = {ID: orderID};
    confirmOrder(data);
  });

  $('button[id^="button-remove"]').click(function() {
    var orderID = this.value;

    var data = {ID: orderID};
    rmOrder(data);
  });
});

var confirmOrder = function(data) {
  var id = data.ID;
  var url = util.getUrl(adminOrdersApi + '/' + id + '?confirm=' + 1);
  util.httpPost(url, data, function(res) {
    $('#order-row-confirm-'+id).html('<p class="text-success">Confirmed!</p>');
  }, function(err) {
    $('#action-status').text("Error: unable to confirm.");
  });
};

var rmOrder = function(data) {
  var id = data.ID;
  var url = util.getUrl(adminOrdersApi + '/' + id);
  util.httpPost(url, data, function(res) {
    $('#order-row-' + id).remove();
  }, function(err) {
    $('#action-status').text("Error: unable to discard.");
  });
}
