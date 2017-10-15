

var createRandomSong = function() {
	
    var songs = new Songs();
    var song = new Song("Time Is Running Out", "res/Songs/Muse-Time-Is-Running-Out.mp3");
    songs.addSong(song);

	var tapProp = 0.8;
		
	for (var i = 0; i < 18; i++)
		song.addBlock(new Block());
    for (var i = 0; i < 1000; i++) {
        var block = new Block();
		
        for (var j = 0; j < 4; j++) {
            var bools = [];
			if (Math.random() > tapProp) {
				for (var k = 0; k < 10; k++) bools[k] = Math.random() > 0.85;
				var row = new Row(0.25*j, bools, Row.TAP_NOTE_TYPE, Math.random() * 0.5);
				tapProp += 0.7;
			} else {
				for (var k = 0; k < 10; k++) bools[k] = false;
				if (Math.random() > 0.66) bools[Math.floor(Math.random() * 6)] = true;
				var row = new Row(0.25*j, bools, Row.NO_TAP_NOTE_TYPE, Math.random() * 0.5);
				tapProp -= 0.1;
			}
            block.addRow(row);
        }
        song.addBlock(block);
    }

    console.log(songs);
	return songs;
};



var newGameButtonListener = function(backgroundMusic, mainMenu) {
	
	
	var elems = document.getElementsByClassName("menuBtn");
	for(var i = 0; i < elems.length; i++) {
		elems[i].className += ' ' + "disabledbutton";
	}
	
	var difficultyMenu = document.createElement("div");
	difficultyMenu.className = "gameDifficulty";
	
	
	var easyBtn = document.createElement("div");
	easyBtn.className = "menuBtn";
	easyBtn.className += ' ' + "difficultyBtn";
	easyBtn.innerHTML = "Easy";
	
	easyBtn.addEventListener(
		"click",
		function() {
			backgroundMusic.pause();
			startGame(mainMenu, difficultyMenu, 1);
		},
		false);
	
	var mediumBtn = document.createElement("div");
	mediumBtn.className = "menuBtn";
	mediumBtn.className += ' ' + "difficultyBtn";
	mediumBtn.innerHTML = "Medium";
	
	mediumBtn.addEventListener(
		"click",
		function() {
			backgroundMusic.pause();
			startGame(mainMenu, difficultyMenu, 2);
		},
		false);
	
	var hardBtn = document.createElement("div");
	hardBtn.className = "menuBtn";
	hardBtn.className += ' ' + "difficultyBtn";
	hardBtn.innerHTML = "Hard";
	
	hardBtn.addEventListener(
		"click",
		function() {
			backgroundMusic.pause();
			startGame(mainMenu, difficultyMenu, 3);
		},
		false);
	
	
	var exitButton = document.createElement('div');
	exitButton.className += "menuBtn";
	exitButton.className += ' ' + "btn-blue";
	exitButton.className += ' ' + "exitBtn";
	exitButton.innerHTML = "Back";
	
	exitButton.addEventListener(
		"click",
		function() {backOnClickListener(difficultyMenu, elems);},
		false);
	
	
	
	difficultyMenu.appendChild(easyBtn);
	difficultyMenu.appendChild(mediumBtn);
	difficultyMenu.appendChild(hardBtn);
	difficultyMenu.appendChild(exitButton);
	document.body.appendChild(difficultyMenu);
	
};


var backOnClickListener = function(difficultyMenu, elems) {
	
	for(var i = 0; i < elems.length; i++) {
		elems[i].classList.remove("disabledbutton");
	}
	
	document.body.removeChild(difficultyMenu);
};


var startGame = function(mainMenu, difficultyMenu, difficulty) {
	
	// eliminates the Main Menu CSS options made in Body
	document.body.className = "";
	document.body.removeChild(mainMenu);
	document.body.removeChild(difficultyMenu);
	
	var randomSongs = createRandomSong();
	var song = randomSongs.songs[0];
	
    this.fret = new FretBoard(song, difficulty);
    this.fret.start();
	
	var menu = document.createElement("DIV");
	menu.className = "initialMenuState";
	
	document.body.appendChild(menu);
	menu.state = 'hidden';
	loadMenuButtons(menu, fret);
	
	document.body.addEventListener(
		'keydown',
		function(event) {pauseListener(event, menu);},
		false);
		
	
	
};



var initMainMenu = function() {
	document.body.className = "mainMenuBody";
};



var Guitarrino = function() {
	
	initMainMenu();
	
	var backgroundMusic = new Audio("res/Songs/Szymon Matuszewski - Space walk.mp3");
	
	var menu = document.createElement("DIV");
	menu.className = "mainMenu";
	
	var newGameButton = document.createElement("DIV");
	newGameButton.className = "menuBtn";
	newGameButton.className += ' ' + "menuBtnLeft";
	newGameButton.innerHTML = "New Game";
	newGameButton.addEventListener(
		"click",
		function() {newGameButtonListener(backgroundMusic, menu);},
		false);
	
	var settingsButton = document.createElement("DIV");
	settingsButton.className = "menuBtn";
	settingsButton.className += ' ' + "menuBtnRight";
	settingsButton.innerHTML = "Settings";
	
	var rankingButton = document.createElement("DIV");
	rankingButton.className = "menuBtn";
	rankingButton.className += ' ' + "menuBtnLeft";
	rankingButton.innerHTML = "Rankings";
	
	var editorButton = document.createElement("DIV");
	editorButton.className = "menuBtn";
	editorButton.className += ' ' + "menuBtnRight";
	editorButton.innerHTML = "Song Editor";
	
	var creditButton = document.createElement("DIV");
	creditButton.className = "menuBtn";
	creditButton.className += ' ' + "menuBtnLeft";
	creditButton.innerHTML = "Credits";
	
	
	menu.appendChild(newGameButton);
	menu.appendChild(settingsButton);
	menu.appendChild(rankingButton);
	menu.appendChild(editorButton);
	menu.appendChild(creditButton);
	document.body.appendChild(menu);
	
	backgroundMusic.loop = true;
	backgroundMusic.play();
	
};