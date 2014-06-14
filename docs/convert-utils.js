var Path = require("path");



//Command options parsing
exports.parseChildren = function(children) {
	if(/^[0-9]*$/.test(children)) {
		return parseInt(children);
	}
	else if(/^(false|none|no)$/i.test(children)) {
		return 0;
	}
	else {
		return Infinity; //Default
	}
	return children;
}
exports.parseIntro = function(intro) {
	if(/^(false|no|not)/i.test(intro)) {
		return false;
	}
	else {
		return true;
	}
}
exports.parsePath = function(path) {
	return Path.resolve(path);
}
exports.parseExternal = function(ext) {
	if(/^(false|no|not)/i.test(ext)) {
		return false;
	}
	else {
		return true;
	}
}






//Utilities
exports.repeat = function(str, num) {
	var res = "";
	for(var i = 0; i < num; i++) {
		res += str;
	}

	return res;
}


exports.shortArgs = function(args) {
	var res = [];
	for(var i = 0, len = args.length; i < len; i++) {
		var str = "";
		var arg = args[i];

		if(arg.optional) {str += "{";}
		str += arg.type;
		str += ": ";
		str += arg.name;
		if(arg.optional) {str += "}";}

		res.push(str);
	}

	return res.join(", ");
}


exports.longArgs = function(args) {
	var res = "";

	for(var i = 0, len = args.length; i < len; i++) {
		var arg = args[i];
		res += "> __" + arg.name + "__: " + arg.description;
		res += " *Default: " + arg.default + "*";
		if(arg.optional !== undefined) {res += "; *Optional*";}
		if(i < len-1) {res += "\n\n";}
	}

	return res;
}