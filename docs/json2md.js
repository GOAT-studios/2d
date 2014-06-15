var fs      = require("fs");
var Path    = require("path");
var program = require("commander");
var utils   = require("./convert-utils");





/* FUNCTIONS */


var parseMD = function(json, basePath, level, parent, options) {
	var str = "";

	if(arguments.length === 4) {
		options = parent;
		var parent = "";
	}
	if(typeof json === "string") {
		if(program.external) {
			//Get external files if needed
			var json = JSON.parse(fs.readFileSync(Path.join(basepath, json+".json"))).main;
		}
		else {
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

		str += "\n\n\n";
		str += parseMD(json.main, basePath, level++, "", options);
	}
	else {

		if(json.inherit) {
			utils.parseInherit(json);
		}
		if(program.include && json.include) {
			var json = utils.mergeInclude(json.include, json, basepath);
		}

	//Title
		if(json.name) {
			var args = "";
			if(json.arguments) {
				var args = utils.shortArgs(json.arguments);
			}

			var names = new Array(json.name);
			if(json.alias) {
				names = names.concat(json.alias);
			}

			for(var i = 0, len = names.length; i < len; i++) {
				str += "## `" + parent + names[i];
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
			str += utils.longArgs(json.arguments);
		}

		if(json.children && level < options.maxLevels) {
			level++;
			var parent = (json.name ? parent+json.name+"." : "");
			for(var i = 0, len = json.children.length; i < len; i++) {
				str += "\n\n\n";
				str += parseMD(json.children[i], basePath, level, parent, options);
			}
		}
	}


	return str;
}





var convertMD = function() {
		console.log("Parsing file: " + filepath);
	var options = {maxLevels: program.children};

	if(program.head) {
		var result = parseMD(json, basepath, 0, options);
	}
	else {
		var result = parseMD(json.main, basepath, 0, options);
	}

		console.log("   Done");

	if(!program.path) {
		program.path = Path.join(basepath, "../md", filename+".md");
	}
		console.log("Writing file: ", program.path);

	fs.writeFileSync(program.path, result, {encoding: "utf8"});

		console.log("   Done");
		console.log("\nDone, withour errors.");
}











/* SCRIPT */

//Set up the options
program
	.version("0.0.1")
	.option("-p, --path [path]", "The path to save the result to")
	.option("-c, --children [number]", "Level of children. 0: Only main, 1: main and it's children, etc. true/all: All children. false/none: same as 0.", utils.parseChildren, Infinity)
	.option("-H, --no-head", "Whether to add the title and intro.")
	.option("-E, --no-external", "Whether to allow getting data from external files.")
	.option("-i, --include", "Whether to allow includes.")
	.parse(process.argv);


utils.parseProgram(program);

console.log("\nWelcome to the JSON to Markdown parser!\n***************************************");
console.log("Your options:\n   Head: "+program.head+"\n   Externals: "+program.external+"\n   Includes: "+program.include+"\n\n");

//Some vars
var filepath = Path.resolve(program.args[0]);
var basepath = Path.dirname(filepath);
var filename = Path.basename(filepath, Path.extname(filepath));

	console.log("Reading file: "+filepath);
var json     = JSON.parse(fs.readFileSync(filepath));
	console.log("   Done");


convertMD();