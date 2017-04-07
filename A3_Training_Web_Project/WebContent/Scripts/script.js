// Variable declaration

// Constant variable declaration for card type
var ICON_TEXT_CLUB = "_of_clubs";
var ICON_TEXT_DIAMOND = "_of_diamonds";
var ICON_TEXT_HEART = "_of_hearts";
var ICON_TEXT_SPADE = "_of_spades";

// Other variables
var FILE_EXTENSION = ".png";
var relativePath = "cards/";
var currentGameNumber = 1;
var cardIcon;
var currentCardPath = "cards/10_of_clubs.png";

// Create an object of card and it's properties
var Card = function() {
	this.name;
	this.path;
};

// setter and getter
Card.prototype.setName = function(name) {
	this.name = name;
};

Card.prototype.setPath = function(path) {
	this.path = path;
};

Card.prototype.getName = function(name) {
	return this.name;
};

Card.prototype.getPath = function(path) {
	return this.path;
};

// Load items before DOM loaded
window.onload = function() {
	cardIcon = document.getElementById('cardIcon');
	cardIcon.src = "cards/back.png";
	cardIcon.name = "10_of_clubs";
};

// Selecting an option to guess the card
function show(element) {
	var cardName = element.options[element.selectedIndex].text;
	var displayedCard = cardIcon.getAttribute('name');
	
	// If Completing the game successfully, Winning message 
	if (cardName == displayedCard) {
		cardIcon.src = currentCardPath;
		if (currentGameNumber == 9) {
			setTimeout(
					function() {
						alert("**Excellent**, You have completed the game. Play again!!");
						cardIcon.src = relativePath + "back" + FILE_EXTENSION;
					}, 1000); // <-- redirect after 1 secs
			currentGameNumber = 2;
			setNextGame(currentGameNumber);
		} else {
			// Correctly guess the card 
			setTimeout(function() {
				alert("**Congratulations**, You won!!");
				cardIcon.src = relativePath + "back" + FILE_EXTENSION;
			}, 1000); // <-- redirect after 1 secs
			var gameNumber = currentGameNumber + 1;
			currentGameNumber = gameNumber;
			setNextGame(currentGameNumber);
		}
	} else {
		// Wrong guess 
		alert("**Try again**, You lost!!");
	}
	;
};

// To fill the data into drop down
function setNextGame(gameNumber) {
	var optionMenu = document.getElementById('options');
	var newOptions = [];
	for ( var i = 0; i < 4; i++) {
		var card = new Card();
		if (i == 0) {
			card.setName(gameNumber + ICON_TEXT_CLUB);
			card.setPath(relativePath + gameNumber + ICON_TEXT_CLUB
					+ FILE_EXTENSION);
		} else if (i == 1) {
			card.setName(gameNumber + ICON_TEXT_DIAMOND);
			card.setPath(relativePath + gameNumber + ICON_TEXT_DIAMOND
					+ FILE_EXTENSION);
		} else if (i == 2) {
			card.setName(gameNumber + ICON_TEXT_HEART);
			card.setPath(relativePath + gameNumber + ICON_TEXT_HEART
					+ FILE_EXTENSION);
		} else if (i == 3) {
			card.setName(gameNumber + ICON_TEXT_SPADE);
			card.setPath(relativePath + gameNumber + ICON_TEXT_SPADE
					+ FILE_EXTENSION);
		}
		;
		newOptions.push(card);
	}
	;

	// To empty dropdown
	while (optionMenu.options.length) {
		optionMenu.remove(0);
	}
	
	// populate new game options in dropdown
	for ( var j = 0; j < newOptions.length; j++) {
		var myCard = newOptions[j];
		var name = myCard.getName();
		var optionItem = new Option(name, j);
		optionMenu.add(optionItem);
	}
	;

	// set the current card name
	var currentCardName = gameNumber + ICON_TEXT_DIAMOND;
	currentCardPath = relativePath + currentCardName + FILE_EXTENSION;
	cardIcon.name = currentCardName;
};

