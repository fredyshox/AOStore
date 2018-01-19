
export var getUrl = function (path) {
  return 'http://' + location.host + path;
}

export var httpPost = function(url, data, onSuccess, onError) {
  return $.ajax({
    url: url,
    async: true,
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(data),
    success: onSuccess,
    error: onError,
    type:'POST'
  })
}

export var inputData = function(element) {
  var data = {};
  var inputs = $(element).find(":input");
  var input;
  for(var i = 0; i<inputs.length; i++) {
    input = inputs[i];
    data[input.name] = input.value;
  }

  return data;
}
