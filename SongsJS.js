
function orderedInsert(element, array, comparer) {
    array.splice(locationOf(element, array, comparer) + 1, 0, element);
    return array;
}

function locationOf(element, array, comparer, start, end) {
    if (array.length === 0) return -1;

    start = start || 0;
    end = typeof(end) !== 'undefined' ? end : array.length;
    var pivot = (start + end) >> 1;

    var c = comparer(element, array[pivot]);
    if (end - start <= 1) return c < 0 ? pivot - 1 : pivot;

    if (c < 0) return locationOf(element, array, comparer, start, pivot);
    else if (c === 0) return pivot;
    else return locationOf(element, array, comparer, pivot, end);
}


var Songs = (function() {
    function Songs() {
        this.songs = [];
    }

    Songs.prototype.addSong = function(song){
        this.songs.push(song);
    };

    Songs.prototype.getSong = function (songName) {
        for (var i = 0; i < this.songs.length; i++) {
            if (this.songs[i].name === songName) return this.songs[i];
        }
    };

    return Songs;
}());


var Song = (function() {
    function Song(songName, songLocation) {
        this.blocks = [];
        this.songName = songName;
		this.songLocation = songLocation;
		this.playingSong = new Audio(songLocation);
		this.playingSong.volume = 0.5;
		
    }

    Song.prototype.addBlock = function(block) {
        block.setPosition(this.blocks.length);
        this.blocks.push(block);
    };

    Song.prototype.getBlock = function (blockPosition) {
        return this.blocks[blockPosition];
    };

    Song.prototype.resetSong = function () {
        for (var i = 0; i < this.blocks.length; i++) {
            this.blocks[i].resetRow();
        }
    };

    return Song;
}());


var Block = (function () {
    function Block() {
        this.rows = [];
        this.currentRow = 0;
    }

    Block.prototype.setPosition = function (position) {this.position = position};

    Block.prototype.addRow = function (row) {
        orderedInsert(row, this.rows, function (row1, row2) { return row1.height - row2.height });
    };

    Block.prototype.getRow = function () {
        if (this.currentRow === this.rows.length) return null;
        return this.rows[this.currentRow++];
    };

    Block.prototype.resetRow = function () {
        for (var i = 0; i < this.rows.length; i++) {
            this.rows[i].reset();
        }
        this.currentRow = 0;
    };

    return Block;
}());


var Row = (function () {
    function Row(height, notes, butType, lenght) {
        this.height = height;
        this.notes = notes;
        this.hit = false;
		this.butType = butType;
		this.lenght = lenght;
    }

    Row.prototype.haveNotes = function(length) {
        for (var i = 0; i < length; i++) if(this.notes[i]) return true;
        return false;
    };

    Row.prototype.reset = function () {
        this.hit = false;
    };

    Row.prototype.hitt = function () {
        this.hit = true;
    };

    Row.prototype.isHit = function () {
        return this.hit;
    };

    return Row;
}());

Row.LONG_NOTE_TYPE = "Long Note";
Row.TAP_NOTE_TYPE = "Tap Note";
Row.NO_TAP_NOTE_TYPE = "No Tap Note";