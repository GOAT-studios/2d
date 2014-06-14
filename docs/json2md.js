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
		//Get external files if needed
		var json = JSON.parse(fs.readFileSync(Path.join(basepath, json+".json"))).main;
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

	//Title
		if(json.name) {
			str += "## `" + parent + json.name;
			if(json.type === "method") {
				str += "( ";
				if(json.arguments) {
					str += utils.shortArgs(json.arguments);
				}
				str += " )";
			}
			str += "`";
		}

		if(json.return) {
			if(json.name) str += "\n";
			str += "#### returns: " + json.return;
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
		console.log("Mode: JSON -> Markdown");
		console.log("Parsing file...");
	var options = {maxLevels: program.children};

	if(program.intro) {
		var result = parseMD(json, basepath, 0, options);
	}
	else {
		var result = parseMD(json.main, basepath, 0, options);
	}

		console.log("   Done");

	if(!program.path) {
		program.path = Path.join(basepath, "../md", filename+".md");
	}
		console.log("Writing file to:", program.path);

	fs.writeFileSync(program.path, result, {encoding: "utf8"});

		console.log("   Done");
		console.log("\nDone, withour errors.");
}











/* SCRIPT */

//Some vars
var filepath = Path.resolve(process.argv[2]);
var basepath = Path.dirname(filepath);
var filename = Path.basename(filepath, Path.extname(filepath));

	console.log("Reading file "+filepath+"...");
var json     = JSON.parse(fs.readFileSync(filepath));
	console.log("   Done");



//Set up the options
program
	.version("0.0.1")
	.usage("<mode> <file> [options]")
	.option("-p, --path <path>", "The path to save the result to", utils.parsePath)
	.option("-c, --children [number]", "Level of children. 0: Only main, 1: main and it's children, etc. true/all: All children. false/none: same as 0.", utils.parseChildren, Infinity)
	.option("-i, --intro [bool]", "Whether to add the title and intro.", utils.parseIntro, true)
	.parse(process.argv);


convertMD();