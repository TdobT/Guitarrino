
// Helper function to pause/unpause
var changeMenuVilibility = function(menu) {

	if (menu.state === 'visible') {
		menu.className = "outerLayer";
		menu.className += ' ' + "menuExit";
		menu.state = 'hidden';
	} else {
		menu.className = "outerLayer";
		menu.className += ' ' + "menuEntrance";
		menu.state = 'visible';
	}
};



var pauseListener = function(event, menu) {
	
	// ESC key and P key.
	if (event.keyCode === 80 || event.keyCode === 27) {
		changeMenuVilibility(menu);
		this.fret.pauseResume();
	}
};


// RESUME the game.
var resumeOnClickListener = function(menu) {
	console.log("click");
	changeMenuVilibility(menu);
	this.fret.pauseResume();	
};


// EXIT the game
var exitOnClickListener = function(fretBoard) {
	
	fretBoard.stop();
	
	while (document.body.firstChild) {
		document.body.removeChild(document.body.firstChild);
	}
	
	// clear listeners of body
	var old_element = document.body;
	var new_element = old_element.cloneNode(true);
	old_element.parentNode.replaceChild(new_element, old_element);
	
	Guitarrino();
	
};



function volumeChanged(value){
	
	console.log(value);
	
	var song = document.getElementsByClassName("fretContainer")[0].song;
	song.playingSong.volume = value / 100;
}

var loadMenuButtons = function(menu, fretBoard) {
	
	// HIGHER SECTION OF MENU
	var highButContainer = document.createElement('div');
	highButContainer.className = "hot-container";
	
	// LOWER SECTION OF MENU
	var lowButContainer = document.createElement('div');
	lowButContainer.className = "hot-container";
	lowButContainer.style.position = "absolute";
	
	// RESUME BUTTON
	var resumeButton = document.createElement('p');
	var resumeButText = document.createElement('a');
	resumeButText.innerHTML = "Resume";
	resumeButText.className += "btn";
	resumeButText.className += " btn-red";
	resumeButton.appendChild(resumeButText);
	
	resumeButton.addEventListener(
		"click",
		function() {resumeOnClickListener(menu);},
		false);
	
	
	// OPTION BUTTON
	var optionButton = document.createElement('p');
	var optionButText = document.createElement('a');
	optionButText.innerHTML = "Options";
	optionButText.className += "btn";
	optionButText.className += " btn-red";
	optionButton.appendChild(optionButText);
	
	
	// VOLUME SLIDER
	var volumeController = document.createElement("INPUT");
	volumeController.setAttribute("type", "range");
	volumeController.setAttribute("min", "0");
	volumeController.setAttribute("max", "100");
	volumeController.setAttribute("value", "50");
	volumeController.setAttribute("onchange", "volumeChanged(this.value)");
	
	// VOLUME SLIDER TEXT
	var volText = document.createElement("a");
	volText.innerHTML = "Volume:";
	volText.className = "volumeText";
	
	
	// EXIT BUTTON
	var exitButton = document.createElement('p');
	var exitButText = document.createElement('a');
	exitButText.innerHTML = "Exit";
	exitButText.className += "btn";
	exitButText.className += " btn-blue";
	exitButton.appendChild(exitButText);
	
	exitButton.addEventListener(
		"click",
		function() {exitOnClickListener(fretBoard);},
		false);
	
	
	
	// ADDING BUTTONS TO CONTAINER
	highButContainer.appendChild(resumeButton);
	highButContainer.appendChild(optionButton);
	highButContainer.appendChild(volText);
	highButContainer.appendChild(volumeController);
	lowButContainer.appendChild(exitButton);
	
	menu.appendChild(highButContainer);
	menu.appendChild(lowButContainer);
	
};
