module.exports.command = function(elementId) {
  this.execute(function (elementId) {
    var events = [
          // Keyboard Events
          'onkeypress', 'onkeydown', 'onkeyup',

          // Form Events
          'onblur', 'onchange', 'onfocus', 'onfocusin', 'onfocusout', 'oninput', 'oninvalid', 'onreset', 'onsearch',
          'onselect', 'onsubmit',

          // Mouse Events
          'onclick', 'oncontextmenu', 'ondblclick', 'onmousedown', 'onmouseenter', 'onmouseleave', 'onmousemove',
          'onmouseover', 'onmouseout', 'onmouseup'
        ],
        target = document.getElementById(elementId),
        logId = 'data-log',
        maxLength = events.reduce(function (previous, current) {
          return previous > current.length ? previous : current.length;
        }, 0);

    events.forEach(function (eventName) {
      var originalHandler = target[eventName];

      target[eventName] = function (event) {
        var pastLog = target.getAttribute(logId) ? target.getAttribute(logId) + '\n' : '',
            padding = '',
            eventInfo,
            index;

        // EcmaScript 6 String.prototype.repeat
        for (index = 0; index < (maxLength - event.type.length - 1); index++) {
          padding += ' ';
        }

        eventInfo = event.type + padding + ' => '  + String.fromCharCode(event.which);

        if (event.altKey) {
          eventInfo += ' with altKey';
        }

        if (event.ctrlKey) {
          eventInfo += ' with ctrlKey';
        }

        if (event.metaKey) {
          eventInfo += ' with metaKey';
        }

        if (event.shiftKey) {
          eventInfo += ' with shiftKey';
        }

        target.setAttribute(logId, pastLog + eventInfo);

        if (originalHandler) {
          originalHandler(event);
        }
      };
    });
  },
  [elementId.replace(/^#/g, '')],
  function (result) {
    if (result.status < 0) {
      console.log('Error while setting up log for #' + elementId + ' element!');
    }
  });

  return this;
};
