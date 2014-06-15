README
=====

Welcome to the documentation of the 2D engine! the docs are available in 3 formats: json (the original, a bit harder to read;) ) in the `json` directory, Markdown (handy for GitHub) in the `md` directory and HTML (for in the browser) (not yet ready, parser isn't there, sorry) in the `html` directory.
Have fun!

> __Note:__ We don't add the Markdown docs yet to the repo, as we're adding too much to the docs that it would become a huge hassle to keep it updated. In the future, when API becomes stable, we'll try to ship the Markdown version of the docs along.


## Using the Parser

To convert the json docs to Markdown, a parser is included. To use it, you'll need [node.js](http://nodejs.org) and NPM (which is installed as you install node). 


### 1: Installing node.js + NPM

#### Windows

Windows users can easily get an installer from the [website](http://nodejs.org). Click on 'Install', which should start a download. When that is ready, open the downloaded file and follow the instructions.


#### Mac

Mac users can also get an easy installer from the [website](http://nodejs.org). Click on 'Install', which should start a download. When that is ready, open the downloaded file and follow the instructions.


#### Ubuntu (and derivatives)

The easiest way is to install via the ppa. It comes down to this (paste these intructions in a terminal, without the `$` sign):

	$ sudo add-apt-repository ppa:chris-lea/node.js
	$ sudo apt-get update
	$ sudo apt-get install nodejs

More detailed instructions can be found in the [node.js wiki](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager#ubuntu-mint-elementary-os). These instructions should be enough to get up and running, though.


#### Other package managers

Detailed instructions can be found on the [node.js wiki](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager).


#### Compiling manually (from source)

Source code can be downloaded from the [download page](http://nodejs.org/download/). If you're choosing this way, you probably know how to handle this.


### 2: Checking the installation

To check if node.js and NPM were installed correctly, execute in a terminal/command prompt:

	$ node -v
	$ npm -v

If these return something like `1.4.9` or `v0.10.28`, then you're good. Otherwise, something went wrong during the installation.


### 3: Installing modules

Now, before you run the parser, you need one node.js module, `commander`. First `cd` into the `docs` directory:

	$ cd path/to/docs/dir

And install with: 

	$ npm install

> __Note:__ Don't mind npm's verbosity, if the command ends without many red warnings, it's ok.

> __Note:__ NPM should find the right installation instructions from the package.json file. If not, give us a shout.


### 4: Usage

With node.js, npm and the commander module installed, you can run any of the converters with `node json2md [options]`. To get some help, use `node json2md -h`. If you don't understand the different options, just experiment a bit, or look into the .json files. It's quite hard to explain them.


### 5: Read the Markdown

The parser converts json to Markdown, which is still hard to read. To be able to properly read the docs, copy it to a service like [this](http://tmpvar.com/markdown.html) to view the markdown a little fancier.

> __Note:__ Github automatically shows Markdown correctly.