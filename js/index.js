

function generate() {

  // Get words from textarea.
  var listString = $('#list').val();
  // Split into array.
  var words = listString.split("\n")

  // The matrix to build.
  var matrix = {};
  // Remember lastLetters extra.
  var lastLetters = [];

  // Build matrix of words.
  for (i in words) {

    var word = words[i];
    word = word.trim();
    // Ignore empty lines.
    if (word == '') {
      continue; 
    }
    var firstLetter = word[0];
    var lastLetter = word[word.length-1];
    matrix[firstLetter] = matrix[firstLetter] || {};

    // Set matrix value with word.
    matrix[firstLetter][lastLetter] = word;
    // Remember last letter.
    lastLetters.push(lastLetter);
  }

  // Cleanup lastLetters.
  lastLetters = jQuery.unique(lastLetters);
  lastLetters.sort();

  // Build HTML table from matrix.
  var table = $('table');
  var tr = $('<tr>');
  var th = $('<th>&nbsp;</th>');
  tr.append(th);

  // Headline with lastLetters.
  for (i in lastLetters) {
    lastLetter = lastLetters[i];
    var th = $('<th>' + lastLetter + '</th>');
    tr.append(th);
  }
  table.append(tr);

  for (firstLetter in matrix) {

    var tr = $('<tr>');
    // Head-column with firstLetters.
    var th = $('<th>' + firstLetter + '</th>');
    tr.append(th);

    // Cells from matrix.
    for (i in lastLetters) {
      lastLetter = lastLetters[i];
      if (lastLetter in matrix[firstLetter]) {
        var td = $('<td>' + matrix[firstLetter][lastLetter] + '</td>');
      } 
      else {
        var td = $('<td>&nbsp;</td>');
      }
      tr.append(td);
    }
    table.append(tr);
  }
};