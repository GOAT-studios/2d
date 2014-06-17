var fs      = require("fs");
var Path    = require("path");
var program = require("commander");






/* FUNCTIONS */


var parseProgram = function(program) {
	//Parser name
	program.parser   = program.args[0];
	program.filepath = Path.resolve(program.args[1]);
	program.basepath = Path.dirname(program.filepath);
	program.filename = Path.basename(program.filepath, Path.extname(program.filepath));

	if(program.path !== "console") {
		if(program.path) {
			program.path = Path.resolve(program.path);
		}
		else {
			program.path = Path.join(program.basepath, "../", program.parser, program.filename+"."+program.parser);
		}
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

var utils = {
	parseExternal: function(ext, basepath) {
		var filename = ext.split(">")[0]; filename = (/.json$/.test(filename) ? filename : filename+".json");
		var filepath = Path.join(basepath, filename);
		var objStr = ext.split(">")[1]; 
		var objectPath = (objStr ? objStr.split(".") : []);

		return {
			filename: filename,
			filepath: filepath,
			objectPath: objectPath
		}
	},
	getJson: function(path) {
		var str = fs.readFileSync(path);
		if(str) {
			return JSON.parse(str);
		}
		else {
			console.log("WARN File not found: '"+path+"'. Leaving empty.");
			return {};
		}
	},
	getExternal: function(path, basepath) {
		var ext = utils.parseExternal(path, basepath);
		var includeJson = utils.getJson(ext.filepath);

		for(var i = 0, len = ext.objectPath.length; i < len; i++) {
			for(var j = 0, lenj = includeJson.children.length; j < lenj; j++) {
				var child = includeJson.children[j];
				if(typeof child === "string") {
					var child = getExternal(basepath, child+".json");
				}
				if(child.name === ext.objectPath[i]) {
					var includeJson = child;
					break;
				}
			}
		}

		return includeJson;
	},
	mergeInclude: function(include, json, basepath) {
		var includeJson = utils.getExternal(include, basepath);

		json = utils.merge(includeJson, json);
		json.include = undefined;
		json.arguments = undefined;

		return json;
	},
	parseInherit: function(json) {
		json.include = json.inherit;
		if(json.inherit.split(">").length === 1) {
			json.inherit = utils.getJson(json.inherit).name;
		}
		else {
			var arr = utils.parseExternal(json.include).objectPath;
			json.inherit = arr[arr.length-1];
		}

		return json;
	},
	merge: function(a, b) {
		for(key in b) {
			var val = b[key];
			a[key] = val;
		}
		return a;
	},
	clone: function(obj, opts) {
		var newObj = utils.merge({}, obj);
		if(opts) newObj = utils.merge(newObj, opts);
		return newObj;
	},
	repeat: function(str, num) {
		var res = "";
		for(var i = 0; i < num; i++) {
			res += str;
		}

		return res;
	}
}











/* SCRIPTS */


//Parse argv

program
	.version("1.0.0")
	.usage("<parser> [options]")
	.option("-p, --path [path]", "The path to save the result to")
	.option("-c, --children [number]", "Level of children. 0: Only main, 1: main and it's children, etc. true/all: All children. false/none: same as 0.", utils.parseChildren, Infinity)
	.option("-H, --no-head", "Whether to add the title and intro.")
	.option("-E, --no-external", "Whether to allow getting data from external files.")
	.option("-i, --include", "Whether to allow includes.")
	.parse(process.argv);


parseProgram(program);

console.log("\nWelcome to the Documentation parser!\n************************************");
console.log("Your options:\n   Head: "+program.head+"\n   Externals: "+program.external+"\n   Includes: "+program.include+"\n\n");



//Read JSON
	console.log("Reading file: "+program.filepath);
var json     = JSON.parse(fs.readFileSync(program.filepath));
	console.log("   Done");

//Get parser
var parserPath = Path.join(__dirname, "parsers", program.parser);
	console.log("Getting parser: "+parserPath);
var parser = require(parserPath);
	console.log("   Done");

//Basic context
var context = {
	level: 0,
	parent: "",
	basepath: program.basepath,
	maxLevels: program.children,
	program: program
}

var errors = 0;




// And get parsing!

	console.log("Parsing file: " + program.filepath);
	console.log("Format: " + parser.outputFormat);

if(program.head) {
	var result = parser.parser(json, context, utils);
}
else {
	var result = parser.parser(json.main, context, utils);
}

	console.log("   Done");



//Write file
if(program.path === "console") {
	console.log("\nResult:\n*******\n\n");
	console.log(result);
	console.log();
}
else {
		console.log("Writing file: ", program.path);
	fs.writeFileSync(program.path, result);
		console.log("   Done");
}




console.log("\nDone, with "+errors+" errors.");