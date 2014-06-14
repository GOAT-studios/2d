var fs    = require("fs");
var Path  = require("path");
var utils = require("./convert-utils");


var filepath = Path.resolve(process.argv[2]);
var basepath = Path.dirname(filepath);
var filename = Path.basename(filepath, Path.extname(filepath));

console.log("Reading file "+filepath+"...  Done");
var json     = JSON.parse(fs.readFileSync(filepath));




var parse = function(json, parent, basePath) {
	if(arguments.length === 2) {
		//Parent is not given -> defaults to ""
		var basePath = parent;
		var parent   = "";
	}
	if(typeof json === "string") {
		//Get external files if needed
		var json = JSON.parse(fs.readFileSync(Path.join(basePath, json+".json"))).main;
	}
	var str = "";


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
		str += parse(json.main, basePath);
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

		if(json.children) {
			var parent = (json.name ? parent+json.name+"." : "");
			for(var i = 0, len = json.children.length; i < len; i++) {
				str += "\n\n\n";
				str += parse(json.children[i], parent, basePath);
			}
		}
	}


	return str;
}


console.log("Parsing file...  Done");

var result = parse(json, basepath);



var newPath = Path.join(basepath, "../md", filename+".md");
console.log("Writing file to:", newPath);
fs.writeFileSync(newPath, result, {encoding: "utf8"});

console.log("\nDone, withour errors.");