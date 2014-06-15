Colliders
=========

## Description 

test test test


## `Colliders`

`Colliders` contains all the Collider logic, like collider constructors and collision checks, provided by a Colliders plugin. Checkout plugins at `src/plugins/Colliders` or `docs/plugins` on how to make a plugin.

> __Note:__ All arguments to functions are required, unless marked as *Optional*.


## `Colliders.Collider( {string: type}, {object: options} )`
#### returns: Collider

The main Collider constructor.

> __type__: The type of collider to return. An array of types can be obtained with `Colliders.getTypes()`. Some standard types can also be found in the plugin docs. *Default: 'box'*; *Optional*

> __options__: The options for the Collider, like position, size, etc. *Default: {}*; *Optional*


## `Colliders.Collider.width`

The width of the AABB of the collider


## `Colliders.Collider.height`

The height of the AABB of the collider


## `Colliders.Collider.pos`

The position Vector of the Collider.


## `Colliders.Collider.pos.scale( {integer|float: factor} )`
#### returns: Vector

Scale the Vector by the given factor.

> __factor__: The factor by which to scale the Vector. *Default: 1*; *Optional*


## `Colliders.Response(  )`
#### returns: Response

The main Response constructor. See `Colliders.test()` for more information.


## `Colliders.test( Collider: A, Collider: B, {Response: response} )`
#### returns: boolean

Test for a collision between 2 colliders (of any type). Returns true if they collide, false if they don't.

> __A__: The first Collider.

> __B__: The second Collider.

> __response__: An empty `Colliders.Response` object. This will be populated with some data about the collision. *Default: {}*; *Optional*