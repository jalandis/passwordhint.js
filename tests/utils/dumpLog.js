module.exports.command = function (elementId) {

  this.execute(function (elementId) {
    return 'Events on ' + elementId + '\n' + document.getElementById(elementId.replace(/^#/g, '')).dataset.log;
  },
  [elementId],
  function (result) {
    if (result.status < 0) {
      console.log('Error while dumping ' + elementId + ' element log!');
      console.log(result  .value.message);
    } else {
      console.log(result.value);
    }
  });

  return this;
};
