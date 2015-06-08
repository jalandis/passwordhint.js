var Util = (function (Util) {
    var intervalId = null;

    var handleKeypress = function (keypress) {

        if (keypress.which == 0) {
            return;
        }

        keypress.preventDefault();
        if (intervalId) {
            clearTimeout(intervalId);
        }

        var passwordField = keypress.target,
            hiddenPassword = document.getElementById(passwordField.id + '_secret'),
            caretPosition = passwordField.selectionStart,
            selectionSize = passwordField.selectionEnd - passwordField.selectionStart,
            character = String.fromCharCode(keypress.which);

        hiddenPassword.value = replaceCharacters(hiddenPassword.value, caretPosition, selectionSize, character);
        passwordField.value = replaceCharacters(generateStars(hiddenPassword), caretPosition, 1, character);
        passwordField.setSelectionRange(caretPosition + 1, caretPosition + 1);

        intervalId = setTimeout(function () {
            var caretStart = passwordField.selectionStart,
                caretEnd = passwordField.selectionEnd;
            passwordField.value = generateStars(hiddenPassword);
            passwordField.setSelectionRange(caretStart, caretEnd);
            intervalId = null;
        }, 1000);
    };

    var ignoreCharacter = function(charCode) {
        return charCode == 0;
    };

    var handleKeydown = function (keydown) {

        if (keydown.which == 8 || keydown.which == 46) {
            keydown.preventDefault();
            if (intervalId) {
                clearTimeout(intervalId);
            }
            var passwordField = keydown.target,
                hiddenPassword = document.getElementById(passwordField.id + '_secret'),
                selectionSize = passwordField.selectionEnd - passwordField.selectionStart,
                caretPosition = passwordField.selectionStart;

            // Delete highlighted or single character
            if (selectionSize != 0) {
                hiddenPassword.value = deleteSelection(hiddenPassword.value, caretPosition, selectionSize);
            } else if (keydown.which == 46) {
                hiddenPassword.value = deleteNextCharacter(hiddenPassword.value, caretPosition);
            } else {
                hiddenPassword.value = deletePreviousCharacter(hiddenPassword.value, caretPosition);
                caretPosition--;
            }
            passwordField.value = generateStars(hiddenPassword);
            passwordField.setSelectionRange(caretPosition, caretPosition);
        }
    };

    var deletePreviousCharacter = function (string, place) {

        if (place == 0) {
            return string;
        } else {
            return replaceCharacters(string, place - 1, 1, '');
        }
    };

    var deleteNextCharacter = function (string, place) {
        return replaceCharacters(string, place, 1, '');
    };

    var deleteSelection = function (string, place, length) {
        return replaceCharacters(string, place, length, '');
    };

    var replaceCharacters = function (string, place, length, replacement) {
        return string.slice(0, place) + replacement + string.slice(place + length);
    };

    var generateStars = function (field) {
        return Array(field.value.length + 1).join("*");
    };

    var libSupported = function (field) {
        if (typeof window.matchMedia !== "function") {
            return false;
        }

        if (typeof field.setSelectionRange !== 'function') {
            return false;
        }

        return true;
    };

    Util.createHint = function (field) {

        if (!libSupported(field)) {
            return;
        }

        var isMobile = window.matchMedia("only screen and (max-width: 760px)");

        if (isMobile.matches) {
            return;
        }

        passwordField = field;

        hiddenPassword = passwordField.cloneNode(true);
        hiddenPassword.id = passwordField.id + '_secret';
        hiddenPassword.className += ' hide';
        passwordField.type = 'text';

        passwordField.parentNode.appendChild(hiddenPassword);

        passwordField.onkeypress = handleKeypress;
        passwordField.onkeydown = handleKeydown;
    };

    return Util;
})(Util || {});
