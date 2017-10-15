


var Billboard = (function() {
	
	function Billboard(difficulty) {
		
		this.points = 0;
		this.multiplier = 1;
		this.consecutiveNotes = 0;
		this.baseTapPoints = difficulty * 25;	
		this.lifepoints = 50;

		this.createBillboard();
		
	}
	
	Billboard.prototype.createBillboard = function() {
	
		this.billboardDIV = document.createElement("DIV");
		this.billboardDIV.className = "billboard";
		document.body.appendChild(this.billboardDIV);
		
		this.pointsDIV = document.createElement("DIV");
		this.pointsDIV.className = "common";
		this.pointsDIV.className += ' ' + "points";
		
		this.multiplierDIV = document.createElement("DIV");
		this.multiplierDIV.className = "common";
		this.multiplierDIV.className += ' ' + "multiplier";
		
		this.consecutiveNotesDIV = document.createElement("DIV");
		this.consecutiveNotesDIV.className = "common";
		this.consecutiveNotesDIV.className += ' ' + "combo";
		
		this.lifepointsDIV = document.createElement("DIV");
		this.lifepointsDIV.className = "common";
		this.lifepointsDIV.className += ' ' + "mediumLife";
		
		this.billboardDIV.appendChild(this.pointsDIV);
		this.billboardDIV.appendChild(this.multiplierDIV);
		this.billboardDIV.appendChild(this.consecutiveNotesDIV);
		this.billboardDIV.appendChild(this.lifepointsDIV);
		
		this.writeDown();
	};
	
	// helper function to update correctly the points multiplier and the points.
	// hit false if it didn't hit, true otherwise 
	Billboard.prototype.updatePoints = function(hit) {
		
		if (hit) {
			this.multiplier = Math.floor(++this.consecutiveNotes / 10) + 1;
			if (this.multiplier > 5) this.multiplier = 5;
			this.points += this.baseTapPoints * this.multiplier;
			this.lifepoints += 5;
			
			// high lifepoint animation
			if (this.lifepoints > 100) this.lifepoints = 100;
			if (this.lifepoints === 75) {
				this.lifepointsDIV.className = "common";
				this.lifepointsDIV.className += ' ' + "highLife";
			} else if (this.lifepoints === 30) {
				this.lifepointsDIV.className = "common";
				this.lifepointsDIV.className += ' ' + "mediumLife";
			}
			
		} else {
			this.consecutiveNotes = 0;
			this.multiplier = 1;
			this.lifepoints -= 5;
			
			// low lifepoint animation
			if (this.lifepoints < 0) this.lifepoints = 0;
			if (this.lifepoints === 25) {
				this.lifepointsDIV.className = "common";
				this.lifepointsDIV.className += ' ' + "lowLife";
			} else if (this.lifepoints === 70) {
				this.lifepointsDIV.className = "common";
				this.lifepointsDIV.className += ' ' + "mediumLife";
			}
			
			// make sound of bad note hit
			var badHit = new Audio("res/Songs/qubodupImpact/qubodupImpactWood.ogg");
			badHit.volume = 0.2;
			badHit.play();
		}
		
		this.writeDown();
	};
	
	Billboard.prototype.writeDown = function() {
		this.pointsDIV.innerHTML =     		 " Points:        " + this.points;
		this.multiplierDIV.innerHTML = 		 "Multiplier:   " + this.multiplier;
		this.consecutiveNotesDIV.innerHTML = " Combo:       " + this.consecutiveNotes;
		this.lifepointsDIV.innerHTML = 		 " Life:             " + this.lifepoints;
	};
	
	return Billboard;
}());