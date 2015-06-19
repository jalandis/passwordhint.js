module.exports.command = function (elementId) {

  this.execute(function (elementId) {
    var target = document.getElementById(elementId.replace(/^#/g, ''));

    return {
      'tag' : target.tagName,
      'id' : target.id,
      'class' : target.className,
      'text' : target.textContent,
      'value' : target.value,
      'value.length' : target.value.length
    };
  },
  [elementId],
  function (result) {
    if (result.status < 0) {
      console.log('Error while dumping ' + elementId + ' JSON representation!');
      console.log(result  .value.message);
    } else {
      console.log(result.value);
    }
  });

  return this;
};
