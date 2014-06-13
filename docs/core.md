2D Core
=======

The core of 2D consists of just one object (in the global scope): `Game`. Game is javascript contstructor, so with `new Game(...)` you can create as many Games as you wish on a sigle page, even with completely different options.

Game has just a few methods and variables, mainly for the game loop, starting and stopping, and managing plugins. That's the true power and beauty of 2D: it consists of a very small core, with all the functionality added with plugins, like `Draw`, `Collisions` etc. There are a few basic plugins, in `src/plugins`.




## `Game( Object: options, {Object: plugins} )`
### returns: `Game`

The main Game constructor.

> __options__: An object containing some options. All possible keys can be found in `options.md`. For no options, use an empty Object.
> *Default: {};*

> __plugins__: An object containing some plugins to be added to the Game. Keys are plugin type (e.g. `Colliders`), values are the plugins (as passed to `Game.plugin()`).
> *Default: {}; Optional;*


## `Game.start( {int|string|Scene: scene} )`
### returns: `Game`

Start the Game.

> __scene__: An integer or string referencing a scene, as passed to `Game.utils.getScene()`; or a Scene, which will be added to the other scenes.
> *Default: null; Optional;*