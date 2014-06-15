var Path = require("path");
var fs   = require("fs");



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
		if(arg.optional || arg.default) res += " *Default: " + arg.default + "*";
		if(arg.optional !== undefined) {res += "; *Optional*";}
		if(i < len-1) {res += "\n\n";}
	}

	return res;
}


exports.mergeInclude = function(json, basepath) {
	var includeJson = getExternal(basepath, json.include);

	var json = merge(includeJson, json);
	json.include = undefined;
	json.arguments = undefined;

	return json;
}