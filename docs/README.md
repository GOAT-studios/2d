README
=====

Welcome to the documentation of the 2D engine! the docs are available in 3 formats: json (the original, a bit harder to read;) ) in the `json` directory, Markdown (handy for GitHub) in the `md` directory and HTML (for in the browser) (not yet ready, parser isn't there, sorry) in the `html`directory.
Have fun!


## Using the Parser

To convert the json docs to Markdown, a parser is included. To use them, you'll need [node.js](http://nodejs.org) and NPM (which is installed as you install node). 


### 1: Installing node.js + NPM

#### Windows

Windows users can easily get an installer from the [website](http://nodejs.org). Click on 'Install', which should start a download. When that is ready, open the downloaded file and follow the instructions.


#### Mac

Mac users can also get an easy installer from the [website](http://nodejs.org). Click on 'Install', which should start a download. When that is ready, open the downloaded file and follow the instructions.


#### Ubuntu (and derivatives)

The easiest way is to install via the ppa. It comes down to this:

	$ sudo add-apt-repository ppa:chris-lea/node.js
	$ sudo apt-get update
	$ sudo apt-get install nodejs

More detailed instructions can be found in the [node.js wiki](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager#ubuntu-mint-elementary-os)


#### Other package managers

Detailed instructions can be found on the [node.js wiki](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager).


#### Compiling manually (from source)

Source code can be downloaded from the [download page](http://nodejs.org/download/). If you're choosing this way, you probably know how to handle this.


### 2: Installing modules

Now, before you run the parser, you need one node.js module, `commander`. First `cd` into the `docs` directory:

	$ cd path/to/docs/dir

And install with: 

	$ npm install

> __Note:__ Don't mind npm's verbosity, if the command ends without many red warnings, it's ok.
> __Note:__ NPM should find the right installation instructions from the package.json file. If not, give us a shout.


### 3: Usage

With node.js, npm and the commander module installed, you can run any of the converters with `node json2md [options]`. To get some help, use `node json2md -h`. If you don't understand the different options, just experiment a bit, or look into the .json files. It's quite hard to explain them.


### 4: Parse the Markdown

The parser converts json to Markdown, which is still hard to read. To be able to properly read the docs, copy it to a service like [this](http://tmpvar.com/markdown.html) to view the markdown a little fancier.

> __Note:__ Github automatically shows Markdown correctly.