
var kDown = function(event) {
	
    if (event.keyCode >= 49 && event.keyCode <= 49 + this.COLUMN) {
        var key = event.keyCode - 49;
        var divBlock = this.tapBoards[key];
        divBlock.style.webkitAnimationName = "";
        divBlock.style.background =
            "url('res/Grabber/" + this.grabberRes[key % this.grabberRes.length] + "PointerDown3.png') center";
        divBlock.style.backgroundSize = "cover";
        divBlock.pressed = true;
        divBlock.style.webkitAnimationName = this.grabberRes[key % this.grabberRes.length] + "GrabberUp";
		
		// here it check if has hit NO_TAP notes
		
		// first checks that there are no other notes selected, since
		// you can't tap a NO_TAP note if you are already pressing other notes
		var noNoteSelected = true;
		/*for (var i = 0; i < this.COLUMN; i++) {
			if (i !== key && this.tapBoards[i].pressed === true) noNoteSelected = false;
		}
		*/
		if (noNoteSelected) {
				
			var currBlockRows = this.currentSong.blocks[this.currentStartingBlock + 1].rows;
			rowNumber = findRowNumber.bind(this, currBlockRows)();
			
			if (rowNumber !== -1) {
				// check if the note type is NO_TAP note
				if (currBlockRows[rowNumber].butType === Row.NO_TAP_NOTE_TYPE) {
					// searching for the exact position of the NO_TAP note 
					// if there are more than 1 NO_TAP notes, takes the first
					var position = -1;
					for (var but = 0; but < this.COLUMN; but++) {
						if (currBlockRows[rowNumber].notes[but]) {
							position = but;
							break;
						}
					}
					if (position > -1 && position === key) {
						// HERE IT EXECUTE THE RIGHT CODE FOR WHEN RIGHT NOTES HAVE BEEN TAPPED.
						// sets the visibility to false if the player had stroke the right notes.
						rightNoteHit.bind(this, currBlockRows, rowNumber)();
					}
				}
			}
		}
    }
    if (event.keyCode === 32 || event.keyCode === 78 || event.keyCode === 77) {
		
		rightTap = true;

		var currBlockRows = this.currentSong.blocks[this.currentStartingBlock + 1].rows;
		rowNumber = findRowNumber.bind(this, currBlockRows)();
		
        // if it found a row with the right height, this part controls
        // that have the same notes that the player pressed
        if (rowNumber !== -1) {
            for (var but = 0; but < this.COLUMN; but++) {
                if (currBlockRows[rowNumber].notes[but] !== this.tapBoards[but].pressed) {
                    rightTap = false;
                    break;
                }
            }
			
			// HERE IT EXECUTE THE RIGHT CODE FOR WHEN RIGHT NOTES HAVE BEEN TAPPED.
            // sets the visibility to false if the player had stroke the right notes.
            if (rightTap) {
				rightNoteHit.bind(this, currBlockRows, rowNumber)();
            } else {

                // normal hit animation
                for (var keys2 = 0; keys2 < this.tapBoards.length; keys2++) {
                    if (this.tapBoards[keys2].pressed === true) {
                        this.tapBoards[keys2].style.webkitAnimationName = "";
                        this.tapBoards[keys2].style.webkitAnimationName = 
							this.grabberRes[keys2 % this.grabberRes.length] + "GrabberPress";
                    }
                }
				
				this.gameBillboard.updatePoints(false);
            }
        } else {

            // normal hit animation
            for (var keys3 = 0; keys3 < this.tapBoards.length; keys3++) {
                if (this.tapBoards[keys3].pressed === true) {
                    this.tapBoards[keys3].style.webkitAnimationName = "";
                    this.tapBoards[keys3].style.webkitAnimationName = 
						this.grabberRes[keys3 % this.grabberRes.length] + "GrabberPress";
                }
            }
			
			this.gameBillboard.updatePoints(false);
        }
    }
};

var findRowNumber = function(currBlockRows) {
	
	// only controls the second block, since it can only hit buttons in this area
	var positionTop = ((-this.blockOffset - 0.5) % 12) / 12 + 0.15;
	var positionBot = ((-this.blockOffset - 0.5) % 12) / 12 - 0.35;
	var rowNumber = -1;

	// this part control that exist a row with at least 1 note
	// that have right height (not the right notes)
	for (var r = 0; r < currBlockRows.length; r++) {

		if (currBlockRows[r].height <= positionTop  &&
			currBlockRows[r].height >= positionBot  &&
			currBlockRows[r].haveNotes(this.COLUMN) &&
			!currBlockRows[r].isHit()) {
			rowNumber = r;
			break;
		}
	}
	
	return rowNumber;
}

var rightNoteHit = function(currBlockRows, rowNumber) {
	
	// right note pressed, shows animation, update score and destroy note
	currBlockRows[rowNumber].hitt();

	// removes the hit notes;
	var children = this.keysDivider[1].childNodes;
	var height = currBlockRows[rowNumber].height;
	var chs = [];

	for (j = 0; j < children.length; j++) 
		if (children[j].height === height) chs[chs.length] = children[j];
	
	for (j = 0; j < chs.length; j++) {
		if (chs[j].tail !== undefined) {
			chs[j].tail.style.background = 
				"url('res/Chords/Light" + chs[j].color + "Chord.png') center";
			
		}
		this.keysDivider[1].removeChild(chs[j]);
	}

	// animation strike
	for (var keys = 0; keys < this.tapBoards.length; keys++) {
		if (this.tapBoards[keys].pressed === true) {
			this.tapBoards[keys].style.webkitAnimationName = "";
			this.tapBoards[keys].style.webkitAnimationName = 
				this.grabberRes[keys % this.grabberRes.length] + "GrabberFire";
		}
	}
	
	this.gameBillboard.updatePoints(true);
};

var kUp = function(event) {
    if (event.keyCode >= 49 && event.keyCode <= 49 + this.COLUMN) {
        var key = event.keyCode - 49;
        this.tapBoards[key].style.webkitAnimationName = "";
        this.tapBoards[key].style.background =
            "url('res/Grabber/" + this.grabberRes[key % this.grabberRes.length] + "Pointer.png') center";
        this.tapBoards[key].style.backgroundSize = "cover";
        this.tapBoards[key].pressed = false;
        this.tapBoards[key].style.webkitAnimationName = this.grabberRes[key % this.grabberRes.length] + "GrabberDown";
    }
    if (event.keyCode === 32 || event.keyCode === 78 || event.keyCode === 77) {
        for (var keys = 0; keys < this.tapBoards.length; keys++) {
            if (this.tapBoards[keys].pressed === true) {
                this.tapBoards[keys].style.webkitAnimationName = "";
            }
        }
    }
};


var FretBoard = (function() {

    function FretBoard(song, difficulty) {
        this.currentSong = song;
		
		// Constant: the speed of the board should remain the same
		var blockSpeed = 10 / 3;
		
		// block height in % of fretboard dimension
        this.blockHeight = 12;

        this.currentStartingBlock = 0;
        this.initialBlockOffset = 0;
        this.finalBlockOffset = -this.blockHeight;
        this.blockOffset = this.initialBlockOffset;
        this.COLUMN = difficulty + 3;

		
		// max number of blocks that can be loaded
        this.maxBlocks = 100 / this.blockHeight + 3; 
		
		// fretboard speed during games		
        this.blockSpeed = blockSpeed * this.blockHeight / 100; 

		
		this.isPaused = false;
		
		// This games Points are stored in the Billboard
		// creates the billboard with the difficulty choosed
		// 1 : easy, 2 : medium, 3 : hard, 4 : impossible
		this.gameBillboard = new Billboard(difficulty);
		

        this.fretCont = document.createElement("SECTION");
        this.fretCont.className = "fretContainer";
		this.fretCont.song = this.currentSong;
        this.fretBoardDivider = document.createElement("DIV");
        this.fretBoardDivider.className = "fretBoard";
        document.body.appendChild(this.fretCont);
        this.fretCont.appendChild(this.fretBoardDivider);
        this.keysDivider = [];
		
		// the next part starts the Game:
		// first has to create elements of the board: the tapBoard buttons and the chords.
		// after this it binds the listener to "keydown" and "keyup" so it does the right things after a key press
		// then it calls addMissingBlocks, which creates the blocks containing the notes to be pressed.
		// finally it start the cycle in which updates the notes and moves the keyboard.
		
		// this are the available colors from the css images
        this.grabberRes = ["Green", "Red", "Yellow", "Blue", "Orange"];

        this.tapBoard = document.createElement("DIV");
        this.tapBoard.className = "tapBoard";
        this.tapBoards = [];
		this.chords = [];
		this.chordsAtt = []
        for (var i = 0; i < this.COLUMN; i++) {
			// tabBoards buttons
            this.tapBoards[i] = document.createElement("DIV");
            this.tapBoards[i].className += "tap";
            this.tapBoards[i].className += ' ' + "pressButton";
			this.tapBoards[i].style.background = 
				"url('res/Grabber/" + this.grabberRes[i % this.grabberRes.length] + "Pointer.png') center";
			this.tapBoards[i].style.backgroundSize = "cover";
            this.tapBoards[i].style.zIndex = 3;
            this.tapBoards[i].style.left = i * 100 / this.COLUMN  + "%";
            this.tapBoards[i].style.width = 100 / this.COLUMN + "%";
            this.tapBoards[i].pressed = false;
            this.tapBoard.appendChild(this.tapBoards[i]);
			
			// attachment to the chords
			this.chordsAtt[i] = document.createElement("DIV");
			this.chordsAtt[i].className = "chordsAtt";
			this.chordsAtt[i].style.left = i * 100 / this.COLUMN + "%";
			this.chordsAtt[i].style.width = 100 / this.COLUMN + "%";
			this.chordsAtt[i].style.backgroundSize = this.COLUMN * 10 + "%";
			this.fretBoardDivider.appendChild(this.chordsAtt[i]);
			
			// the chords
			this.chords[i] = document.createElement("DIV");
			this.chords[i].className = "chords";
			this.chords[i].style.left = i * 100 / this.COLUMN + "%";
			this.chords[i].style.width = 100 / this.COLUMN + "%";
			this.fretBoardDivider.appendChild(this.chords[i]);
        }
        this.fretBoardDivider.appendChild(this.tapBoard);

        document.addEventListener('keydown', kDown.bind(this), false);

        document.addEventListener('keyup', kUp.bind(this), true);

        this.addMissingBlocks();
    }

    FretBoard.prototype.addMissingBlocks = function () {

        var missingBlocks = this.currentSong.blocks.length - this.currentStartingBlock;
        if (missingBlocks > this.maxBlocks) missingBlocks = this.maxBlocks;

        var startingLength = this.keysDivider.length;

        for (var i = 0; i < missingBlocks - startingLength; i++) {
            this.keysDivider.push(document.createElement("DIV"));
            this.keysDivider[this.keysDivider.length-1].className = "fretKey";
            this.keysDivider[this.keysDivider.length-1].style.height = this.blockHeight + "%";

            var butts = [];

            var block = this.currentSong.blocks[this.currentStartingBlock + this.keysDivider.length - 1];

            for (var row = 0; row < block.rows.length; row++) {

                for (var c = 0; c < this.COLUMN; c++) {

                    if (block.rows[row].notes[c]) {
                        butts[c] = document.createElement("DIV");
						butts[c].color = this.grabberRes[c % this.grabberRes.length];
                        butts[c].className = "tap";
                        butts[c].style.top = (0.75-block.rows[row].height)*100 + "%";
                        butts[c].style.left = c * 100 / this.COLUMN  + "%";
                        butts[c].style.width = 100 / this.COLUMN + "%";
                        butts[c].height = block.rows[row].height;
						butts[c].color = this.grabberRes[c % this.grabberRes.length];
						
						// loading the right type of Tap Note (No Tap notes are different)
						if (block.rows[row].butType === Row.NO_TAP_NOTE_TYPE) 
							butts[c].style.background = "url('res/Buttons/" + butts[c].color + "Tap.png') center";
						else 
							butts[c].style.background = "url('res/Buttons/" + butts[c].color + ".png') center";
						
						butts[c].style.backgroundSize = "cover";
						// if it's a long note create the tail
						if (block.rows[row].butType === Row.LONG_NOTE_TYPE) {
							butts[c].tail = document.createElement("DIV");
							butts[c].tail.className = "tail";
							butts[c].tail.style.top = 2 + -block.rows[row].lenght * 100 + (0.75-block.rows[row].height)*100 + "%";
							butts[c].tail.style.left = (0.37 + c) * 100 / this.COLUMN  + "%";
							butts[c].tail.style.width = 26 / this.COLUMN + "%";
							butts[c].tail.style.height = block.rows[row].lenght * 100 + "%";
							butts[c].tail.style.background = 
								"url('res/Chords/Dark" + butts[c].color + "Chord.png') center";
							this.keysDivider[this.keysDivider.length - 1].appendChild(butts[c].tail);
						}
						
                        this.keysDivider[this.keysDivider.length - 1].appendChild(butts[c]);
                    }
                }
            }

            this.fretBoardDivider.appendChild(this.keysDivider[this.keysDivider.length-1]);
            this.keysDivider[i].style.bottom = this.blockOffset + this.blockHeight*i + "%";
        }
    };

    FretBoard.prototype.update = function () {

        if (this.currentStartingBlock === this.currentSong.blocks.length - 1) {
            clearInterval(this.timer);
            return;
        }

        if (this.blockOffset <= this.finalBlockOffset) {
            this.fretBoardDivider.removeChild(this.keysDivider[0]);
            this.keysDivider.splice(0, 1);
            this.currentStartingBlock++;
            this.addMissingBlocks();
            this.blockOffset = this.initialBlockOffset;
			
			// Controls if there are remaining notes from the new ending block.
			// if the control return true, it must update the pointMultiplier, since
			// the player can't hit those notes anymore and they must be considered lost.
			if (this.keysDivider[0].hasChildNodes()) {
				this.gameBillboard.updatePoints(false); // restarting the point multiplier
			}
        }
        else this.blockOffset -= this.blockSpeed;

        for (var i = 0; i < this.keysDivider.length; i++) {
            this.keysDivider[i].style.bottom = this.blockOffset + this.blockHeight*i + "%";
        }
    };

    FretBoard.prototype.start = function () {
        this.currentStartingBlock = 0;
        this.currentSong.resetSong();
        this.timer = setInterval(this.update.bind(this), 16);
		this.currentSong.playingSong.play();
    };

    FretBoard.prototype.pauseResume = function () {
		if (!this.isPaused) {
			clearInterval(this.timer);
			this.currentSong.playingSong.pause();
			this.isPaused = true;
		} else {
			this.currentSong.playingSong.play();
			this.timer = setInterval(this.update.bind(this), 16);
			this.isPaused = false;
		}
    };

    FretBoard.prototype.stop = function () {
		this.currentSong.playingSong.pause();
        clearInterval(this.timer);
    };

    FretBoard.prototype.setSong = function (song) {
        this.currentSong = song;
    };


    return FretBoard;
}());

