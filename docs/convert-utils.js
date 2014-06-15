var Path = require("path");
var fs   = require("fs");



exports.parseProgram = function(program) {
	//Path
	if(program.path) {
		program.path = Path.resolve(program.path);
	}
	
	//Children
	if(program.children) {
		if(/^[0-9]*$/.test(program.children)) {
			program.children = parseInt(program.children);
		}
		else if(/^(false|none|no)$/i.test(program.children)) {
			program.children = 0;
		}
		else {
			program.children = Infinity; //Default
		}
	}
	else {
		program.children = Infinity;
	}

	program.head = !!program.head;
	program.external = !!program.external;
	program.include = !!program.include;

	return program;
}

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
exports.parseBool = function(bool) {
	if(/^(false|no|not)/i.test(bool)) {
		return false;
	}
	else {
		return true;
	}
}
exports.parsePath = function(path) {
	return Path.resolve(path);
}



// Utils
var getExternal = exports.getExternal = function(basepath, path) {
	var filename = path.split(">")[0];
	if(!/.json$/.test(filename)) {filename += ".json";}
	var filepath = Path.join(basepath, filename);

	var includeJson = JSON.parse(fs.readFileSync(filepath)).main;

	var objectStr = path.split(">")[1];
	if(objectStr) {
		var objectPath = objectStr.split(".");

		for(var i = 0, len = objectPath.length; i < len; i++) {
			for(var j = 0, lenj = includeJson.children.length; j < lenj; j++) {
				var child = includeJson.children[j];
				if(typeof child === "string") {
					var child = getExternal(basepath, child+".json");
				}
				if(child.name === objectPath[i]) {
					var includeJson = child
					break;
				}
			}
		}
	}

	return includeJson;
}

var merge = exports.merge = function(a, b) {
	for(key in b) {
		var val = b[key];
		a[key] = val;
	}

	return a;
}





// Parse Utilities
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
		if(arg.optional !== undefined || arg.default !== undefined) res += " *Default: " + arg.default + "*";
		if(arg.optional !== undefined) {res += "; *Optional*";}
		if(i < len-1) {res += "\n\n";}
	}

	return res;
}


exports.mergeInclude = function(include, json, basepath) {
	var includeJson = getExternal(basepath, include);

	var json = merge(includeJson, json);
	json.include = undefined;
	json.arguments = undefined;

	return json;
}


exports.parseInherit = function(json) {
	json.include = json.inherit;
	if(json.inherit.split(">").length === 1) {
		json.inherit = JSON.parse(fs.readFileSync(json.inherit)).name;
	}
	else {
		var arr = json.inherit.split(">")[1].split(".");
		json.inherit = arr[arr.length-1];
	}

	return json;
}