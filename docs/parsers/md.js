var Path = require("path");
var fs   = require("fs");



exports.outputFormat = "Markdown (.md)";



var parser = exports.parser = function(json, context, utils) {
	var str = "";

	if(typeof json === "string") {
		if(context.program.external) {
			//Get external files if needed
			var json = utils.getExternal(json, context.basepath);
		}
		else {
			console.log("WARN File could not be found: '" +Path.join(context.basepath, json+".json") + "'. Leaving empty.")
			var json = {};
		}
	}


	if(json.main) {
		//This is the main page, add title and intro

		if(json.title) {
			str += json.title + "\n";
			str += utils.repeat("=", json.title.length);
		}

		if(json.intro) {
			str += "\n\n## Description \n\n";
			str += json.intro;
		}

		var childContext = utils.clone(context, {level: context.level+1});
		str += "\n\n\n";
		str += parser(json.main, childContext, utils);
	}
	else {

		if(json.inherit) {
			utils.parseInherit(json);
		}
		if(context.program.include && json.include) {
			utils.mergeInclude(json.include, json, context.basePath);
		}

	//Title
		if(json.name) {
			var args = "";
			if(json.arguments) {
				var args = shortArgs(json.arguments);
			}

			var names = new Array(json.name);
			if(json.alias) {
				names = names.concat(json.alias);
			}

			for(var i = 0, len = names.length; i < len; i++) {
				str += "## `" + context.parent + names[i];
				if(json.type === "method" || json.type === "constructor" || json.type === "function") {
					str += "( " + args + " )"
				}
				str += "`";
				if(i < len) {str += "\n";}
			}
		}

		if(json.return) {
			if(json.name) str += "\n";
			str += "#### returns: " + json.return;
		}
		else if(json.type === "constructor") {
			if(json.name) str += "\n";
			str += "#### returns: " + (json.name || "");
		}
		else {
			if(json.name) str += "\n";
			str += "#### type: " + (json.type || "");
		}

		if(json.inherit) {
			str += " | Inherits from: " + json.inherit;
		}

	//Description
		if(json.description) {
			str += "\n\n";
			str += json.description;
		}

		if(json.arguments) {
			str += "\n\n";
			str += longArgs(json.arguments);
		}

		if(json.children && context.level < context.maxLevels) {
			var childContext = utils.clone(context, {level: context.level+1});
			var parent = (json.name ? context.parent+json.name+"." : "");
			for(var i = 0, len = json.children.length; i < len; i++) {
				str += "\n\n\n";
				str += parser(json.children[i], context, utils);
			}
		}
	}


	return str;
}


var shortArgs = function(args) {
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

var longArgs = function(args) {
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