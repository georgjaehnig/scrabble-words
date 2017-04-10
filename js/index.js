var wordlists = {};

var fillWords = function(key) {
  var words = wordlists[key].words;
  words = words.trim();
  $('#words').val(words);
  generate();
}

$(window).load(function() {

  var savedListsChanged = function(event) {
    if (!event.target.value in wordlists) {
      return;
    }
    var key = event.target.value;
    fillWords(key);
  };

  $('#savedLists').change(savedListsChanged);

  var select = $('#savedLists');
  for (key in wordlists) {
    var option = $('<option>');
    option.attr('value', key);
    option.text(wordlists[key].label);
    select.append(option);
  }

  // Default:
  select.val('en2'); 
  fillWords('en2');
});




function generate() {

  var cellContentStyle = $('#cellContentStyle').val();

  // Get words from textarea.
  var wordsString = $('#words').val();
  // Split into array.
  var words = wordsString.split("\n")

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

		if (!matrix[firstLetter][lastLetter]) {
			matrix[firstLetter][lastLetter] = [];
		}
    // Set matrix value with word.
    matrix[firstLetter][lastLetter].push(word);
    // Remember last letter.
    lastLetters.push(lastLetter);
  }

  // Cleanup lastLetters.
  lastLetters = jQuery.unique(lastLetters);
  lastLetters.sort();

  // Build HTML table from matrix.
  var table = $('table');
  table.empty();
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
        if (cellContentStyle == 'word') {
          var cellContent = matrix[firstLetter][lastLetter].join('<br/>');
        }
        else {
          var cellContent = 'X';
        }
        var td = $('<td>' + cellContent + '</td>');
      } 
      else {
        var td = $('<td>&nbsp;</td>');
      }
      tr.append(td);
    }
    table.append(tr);
  }
};
