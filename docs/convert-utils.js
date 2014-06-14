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
		res += " *Default: " + res.default + "*";
		if(arg.optional !== undefined) {res += "; *Optional: " + arg.optional + "*";}
		if(i < len-1) {res += "\n\n";}
	}

	return res;
}