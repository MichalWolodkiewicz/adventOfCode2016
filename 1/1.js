var steps = ["L2", "L3", "L3", "L4", "R1", "R2", "L3", "R3", "R3", "L1", "L3", "R2", "R3", "L3", "R4", "R3", "R3", "L1", "L4", "R4", "L2", "R5", "R1", "L5", "R1", "R3", "L5", "R2", "L2", "R2", "R1", "L1", "L3", "L3", "R4", "R5", "R4", "L1", "L189", "L2", "R2", "L5", "R5", "R45", "L3", "R4", "R77", "L1", "R1", "R194", "R2", "L5", "L3", "L2", "L1", "R5", "L3", "L3", "L5", "L5", "L5", "R2", "L1", "L2", "L3", "R2", "R5", "R4", "L2", "R3", "R5", "L2", "L2", "R3", "L3", "L2", "L1", "L3", "R5", "R4", "R3", "R2", "L1", "R2", "L5", "R4", "L5", "L4", "R4", "L2", "R5", "L3", "L2", "R4", "L1", "L2", "R2", "R3", "L2", "L5", "R1", "R1", "R3", "R4", "R1", "R2", "R4", "R5", "L3", "L5", "L3", "L3", "R5", "R4", "R1", "L3", "R1", "L3", "R3", "R3", "R3", "L1", "R3", "R4", "L5", "L3", "L1", "L5", "L4", "R4", "R1", "L4", "R3", "R3", "R5", "R4", "R3", "R3", "L1", "L2", "R1", "L4", "L4", "L3", "L4", "L3", "L5", "R2", "R4", "L2"];

var DIR_LEFT = [-1, 0],
    DIR_RIGHT = [1, 0],
    DIR_TOP = [0 ,1],
    DIR_BOTTOM = [0, -1];

var direction = {
  value: DIR_TOP,
  dir: "top",
  getTranslation: function() {return this.value;},
  rotate: function(r) {
    if(r === "L") {
      if(this.dir == "left") {this.dir = "bottom"; this.value = DIR_BOTTOM;}
      else if(this.dir == "right") {this.dir = "top"; this.value = DIR_TOP;}
      else if(this.dir == "top") {this.dir = "left"; this.value = DIR_LEFT;}
      else if(this.dir == "bottom") {this.dir = "right"; this.value = DIR_RIGHT;}
    } else {
      if(this.dir == "left") {this.dir = "top"; this.value = DIR_TOP;}
      else if(this.dir == "right") {this.dir = "bottom"; this.value = DIR_BOTTOM;}
      else if(this.dir == "top") {this.dir = "right"; this.value = DIR_RIGHT;}
      else if(this.dir == "bottom") {this.dir = "left"; this.value = DIR_LEFT;}
    }
  }
};

var position = {
  coordinates: {x:0, y:0},
    value: function() { return this.coordinates;},
      move: function (translation, step){
        this.coordinates.x += (translation[0] * parseInt(step));
        this.coordinates.y += (translation[1] * parseInt(step));
      }
  
};

var positionHistory = {
	firstCross: null,
	hist: [],
	add: function(position) {
		var pStr = ""+position.x+","+""+position.y;
		if(this.firstCross === null) {
			if(this.hist.indexOf(pStr) > -1) {
				console.log('firstCross founded. ' + pStr);
				this.firstCross = { x: position.x, y: position.y};
			} else {
				this.hist.push(pStr);
			}
		}
	}
};


for(var i=0; i< steps.length; ++i) {
	positionHistory.add(position.value());
	direction.rotate((steps[i])[0]);
	position.move(direction.getTranslation(), (steps[i]).substr(1));
}

console.log('blocks away = ' + (Math.abs(position.value().x) + Math.abs(position.value().y)));
console.log('first cross blocks away = ' + (Math.abs(positionHistory.firstCross.x) + Math.abs(positionHistory.firstCross.y)));
