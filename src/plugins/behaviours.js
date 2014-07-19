var Behaviours;

(function() {



Behaviours = function() {
	this.behaviours = [];
	return this;
}

Behaviours.prototype.name = "behaviours";
Behaviours.prototype.type = "behaviours";

Behaviours.prototype.register = function(behaviour) {
	this.behaviours.push(behaviour);

	return this;
}

Behaviours.prototype.remove = function(name) {
	var behaviours = this.behaviours;
	for(var i = 0, len = behaviours.length; i < len; i++) {
		if(behaviours[i].name === name) {
			behaviours.splice(i, 1);
		}
	}

	return this;
}

Behaviours.prototype.get = function(name) {
	var behaviours = this.behaviours;
	for(var i = 0, len = behaviours.length; i < len; i++) {
		if(behaviours[i].name === name) {
			return behaviours[i];
		}
	}

	return null;
}



})();