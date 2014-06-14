README
=====

Welcome to the documentation of the 2D engine! the docs are available in 3 formats: json (the original, a bit harder to read;) ) in the `json` directory, Markdown (handy for GitHub) in the `md` directory and HTML (for in the browser) (not yet ready, parser isn't there, sorry) in the `html`directory.
Have fun!


## Converting

To convert the json docs to Markdown or HTML, 2 parsers are included. To use them, you'll need [node.js](http://nodejs.org) and NPM (which is installed as you install node). Installers for Windows and Mac can be found on their website, along with the source code. For linux, installation instructions can be found [here](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager) (if you don't want to compile manually)

Now, before you run the converter, you need one node.js module, `commander`. Install it with: `npm install` (don't mind npm's verbosity, if the command ends without many red warnings, it's ok).

With node.js, npm and the commander module installed, you can run any of the converters with `node <converterName>`. To get some help, use `node <converterName> -h`. Happy reading!