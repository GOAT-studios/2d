README
=====

Welcome to the documentation of the 2D engine! The docs are available in JSON format, but a parser script is provided to convert the JSON to another format (like Markdown, for which a parser is included). You can easily add your own parser (in the `parsers` directory). Take a look at the Markdown parser (`md.js`) to get an idea of how this works.
Have fun!

> __Note:__ We don't add the Markdown docs yet to the repo, as we're adding so much to the docs that it would become a huge hassle to keep it updated. In the future, when the API becomes stable, we'll try to ship the Markdown version of the docs along.


## Using the Parser

To convert the json docs to another format (Markdown, for example), a parser script is included. To use it, you'll need [node.js](http://nodejs.org) and NPM (which is installed as you install node). 


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

> __Note:__ You can type `cd ` and drag the `docs` folder onto the terminal. Then press enter.

And install with: 

	$ npm install

> __Note:__ Don't mind npm's verbosity, if the command DOES NOT end with many red warnings, it's ok.

> __Note:__ NPM should find the right installation instructions from the package.json file. If not, give us a shout.


### 4: Usage

With node.js, npm and the commander module installed, you can run any of the parsers with `node parser <parser> [options]`, where `<parser>` is the name of the parser to use (the filename, without extension, of the parser script in the `parsers` directory)(That's many `parser`s in one sentence :smiley:). These are the possible options:

> __-p | --path [path]__ The path of the file in which to save the result. `console` to log the result to the console.

> __-c | --children [number]__ The maximum number of children levels.

> __-H | --no-head__ Do not include a title and intro.

> __-E | --no-external__ Do not allow getting data from external files.

> __-i | --include__ Allow includes and inherits to be included.


If you want some help about the usage, type:

	$ node parser -h




### 5: Reading Markdown

The parser can convert json to Markdown, which is still hard to read. To be able to properly read the Markdown docs, copy the result to a service like [this](http://tmpvar.com/markdown.html) to view the markdown a little fancier.

> __Note:__ Github automatically shows Markdown the fancy way, that's why we use it so extensively.