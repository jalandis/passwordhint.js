module.exports.command = function (elementId) {

  this.execute(function (elementId) {
    var target = document.getElementById(elementId),
        formattedLog = 'Logged the following events for #' + elementId + ':\n';

    Object.keys(target.dataset).forEach(function (key) {
      formattedLog += key + ' : ' + target.dataset[key] + '\n';
    });

    return formattedLog;
  },
  [elementId],
  function (result) {
    if (result.status < 0) {
      console.log('Error while dumping #' + elementId + ' element log!');
      console.log(result.value.message);
    } else {
      console.log(result.value);
    }
  });

  return this;
};
