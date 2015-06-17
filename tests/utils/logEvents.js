module.exports.command = function(elementId) {
  this.execute(function (elementId) {
    var events = ['onkeypress', 'onkeydown', 'onkeyup'],
        target = document.getElementById(elementId);

    events.forEach(function (eventName) {
      var originalHandler = target[eventName],
          logId = 'data-' + eventName;

      target[eventName] = function (event) {
        var keys = target.getAttribute(logId);
        if (keys) {
          target.setAttribute(logId, keys + ',' + String.fromCharCode(event.which));
        } else {
          target.setAttribute(logId, String.fromCharCode(event.which));
        }
        originalHandler(event);
      };
    });
  },
  [elementId],
  function (result) {
    if (result.status < 0) {
      console.log('Error while setting up log for #' + elementId + ' element!');
    }
  });

  return this;
};
