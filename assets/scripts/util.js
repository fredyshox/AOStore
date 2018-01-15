
export var getUrl = function (path) {
  return 'http://' + location.host + path;
}

export var httpPost = function(url, data, onSuccess, onError) {
  return $.ajax({
    url: url,
    async: true,
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: onSuccess,
    error: onError,
    type:'POST'
  })
}
