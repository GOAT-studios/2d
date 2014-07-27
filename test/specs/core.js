describe("Core", function() {

	describe("properties", function() {

		var game = new Game({}, plugins);

		it("has an init() function", function() {
			expect(typeof game.init).toBe("function");
		});
		it("has a load() function", function() {
			expect(typeof game.load).toBe("function");
		});
		it("has a start() function", function() {
			expect(typeof game.start).toBe("function");
		});
		it("has a pause() function", function() {
			expect(typeof game.pause).toBe("function");
		});
		it("has a stop() function", function() {
			expect(typeof game.stop).toBe("function");
		});
		it("has a Loop() function", function() {
			expect(typeof game.Loop).toBe("function");
		});
		it("has a plugin() function", function() {
			expect(typeof game.plugin).toBe("function");
		});
		it("has a category() function", function() {
			expect(typeof game.category).toBe("function");
		});
		it("has a Utils property", function() {
			expect(game.Utils).toBeDefined();
		});
		it("has a Plugins property", function() {
			expect(game.Plugins).toBeDefined()
		});
		it("has a Categories property", function() {
			expect(game.Categories).toBeDefined();
		});

	});

	describe("init", function() {

		var game = new Game({}, plugins);

		var beforeInit = jasmine.createSpy("beforeinit");
		var afterInit = jasmine.createSpy("afterinit");
		game.on("beforeinit", beforeInit);
		game.on("init", afterInit);

		var result = game.init();

		it("calls game.Plugins.Init() with the game as only argument", function() {
			var game = new Game();
			spyOn(game.Plugins, "Init");
			game.init();

			expect(game.Plugins.Init).toHaveBeenCalledWith(game);
			expect(game.Plugins.Init.calls.count()).toBe(1);
		});
		it("returns the game", function() {
			expect(result).toBe(game);
		});
		it("sets initTime", function() {
			expect(typeof game.initTime).toBe("number");
		});
		it("emits 'beforeinit'", function() {
			expect(beforeInit).toHaveBeenCalledWith(game);
			expect(beforeInit.calls.count()).toBe(1);
		});
		it("emits 'init'", function() {
			expect(afterInit).toHaveBeenCalledWith(game);
			expect(afterInit.calls.count()).toBe(1);
		});

	});

	describe("load", function() {

		var game = new Game({}, plugins);

		var beforeLoad = jasmine.createSpy("beforeload");
		var afterLoad = jasmine.createSpy("afterload");
		game.on("beforeload", beforeLoad);
		game.on("load", afterLoad);

		var result = game.load();

		it("calls game.Plugins.Load() with the game as only argument", function() {
			var game = new Game();
			spyOn(game.Plugins, "Load");
			game.load();

			expect(game.Plugins.Load).toHaveBeenCalledWith(game);
			expect(game.Plugins.Load.calls.count()).toBe(1);
		});
		it("calls game.init() (if it hasn't been called yet)", function() {
			var game = new Game();
			spyOn(game, "init");
			game.load();

			expect(game.init).toHaveBeenCalled();
			expect(game.init.calls.count()).toBe(1);
		});
		it("returns the game", function() {
			expect(result).toBe(game);
		});
		it("sets loadTime", function() {
			expect(typeof game.loadTime).toBe("number");
		});
		it("emits 'beforeload'", function() {
			expect(beforeLoad).toHaveBeenCalledWith(game);
			expect(beforeLoad.calls.count()).toBe(1);
		});
		it("emits 'load'", function() {
			expect(afterLoad).toHaveBeenCalledWith(game);
			expect(afterLoad.calls.count()).toBe(1);
		});

	});

	describe("start", function() {

		var game = new Game({}, plugins);

		var beforeStart = jasmine.createSpy("beforestart");
		var afterStart = jasmine.createSpy("afterstart");
		game.on("beforestart", beforeStart);
		game.on("start", afterStart);

		var result = game.start();

		it("calls game.requestAnimationFrame() with game.Loop as only argument", function() {
			var game = new Game();
			spyOn(game, "requestAnimationFrame");
			game.start();

			expect(game.requestAnimationFrame).toHaveBeenCalledWith(game.Loop);
			expect(game.requestAnimationFrame.calls.count()).toBe(1);
		});
		it("calls game.Loop()", function() {
			var game = new Game();
			spyOn(game, "Loop");
			game.start();

			expect(game.Loop.calls.count()).toBe(1);
		});
		it("calls game.load() (if it hasn't been called yet)", function() {
			var game = new Game();
			spyOn(game, "load");
			game.start();

			expect(game.load.calls.count()).toBe(1);
		});
		it("calls game.init() (if it hasn't been called yet)", function() {
			var game = new Game();
			spyOn(game, "init");
			game.start();

			expect(game.init.calls.count()).toBe(1);
		});
		it("returns the game", function() {
			expect(result).toBe(game);
		});
		it("sets startTime", function() {
			expect(typeof game.startTime).toBe("number");
		});
		it("sets timer (requests an Animations Frame)", function() {
			expect(game.timer).toBeDefined();
			expect(game.timer).not.toBeNull();
		})
		it("emits 'beforestart'", function() {
			expect(beforeStart).toHaveBeenCalledWith(game);
			expect(beforeStart.calls.count()).toBe(1);
		});
		it("emits 'start'", function() {
			expect(afterStart).toHaveBeenCalledWith(game);
			expect(afterStart.calls.count()).toBe(1);
		});

	});

	describe("Utils", function() {

		var game = new Game({}, plugins);

		describe("capitalize", function() {
			it("works", function() {
				expect(game.Utils.capitalize("hello")).toBe("Hello");
				expect(game.Utils.capitalize("Bye")).toBe("Bye");
				expect(game.Utils.capitalize(".hi")).toBe(".hi");
			});
		});

		describe("merge", function() {
			it("works", function() {
				var a = {"hello":"hi"};
				var b = {"hi": "hello", "bye": "toodeloo"};
				var blacklist = ["hi"];
				expect(game.Utils.merge(a, b, blacklist)).toEqual({"hello":"hi", "bye":"toodeloo"});
			});
		});

		describe("toRadians", function() {
			it("works", function() {
				expect(game.Utils.toRadians(180)).toBe(Math.PI);
				expect(game.Utils.toRadians(360)).toBe(Math.PI * 2);
			});
		});

		describe("toDegrees", function() {
			it("works", function() {
				expect(game.Utils.toDegrees(Math.PI)).toBe(180);
				expect(game.Utils.toDegrees(Math.PI*2)).toBe(360);
			});
		});

		describe("time", function() {
			it("works", function() {
				expect(typeof game.Utils.time()).toBe("number");
			});
		});

	});

	describe("requestAnimationFrame", function() {

		var game = new Game();

		it("works", function(done) {
			spyOn(game, "Loop");
			var result = game.requestAnimationFrame();

			expect(result).toBe(game);
			expect(game.timer).toBeDefined();
			expect(game.timer).not.toBeNull();

			setTimeout(function() {
				expect(game.Loop).toHaveBeenCalled();
				done();
			}, 20);
		});

	});

	describe("cancelAnimationFrame", function() {

		var game = new Game();

		it("works", function() {
			game.requestAnimationFrame();
			var result = game.cancelAnimationFrame();
			spyOn(game, "Loop");

			expect(result).toBe(game);

			jasmine.clock().install();
			jasmine.clock().tick(100);

			expect(game.Loop).not.toHaveBeenCalled();
			jasmine.clock().uninstall();

		});

	});

	describe("Plugins", function() {

		var game = new Game({}, plugins);
		var plugin = {
			name: "some-plugin",
			type: "someType",
			someFunc: function(a, b) {
				return (a + b) / 2;
			}
		};

		describe("game.plugin", function() {

			it("calls Plugins.add()", function() {
				spyOn(game.Plugins, "add");
				game.plugin(plugin);

				expect(game.Plugins.add).toHaveBeenCalledWith(plugin);
				expect(game.Plugins.add.calls.count()).toBe(1);
			});

			it("returns game", function() {
				expect(game.plugin(plugin)).toEqual(game);
			});

		});

		describe("add", function() {

			var result = game.Plugins.add(plugin);

			it("returns Plugins", function() {
				expect(result).toBe(game.Plugins);
			});
			it("adds to plugin to plugins list", function() {
				expect(game.Plugins.plugins.Sometype).toContain(plugin);
			});
			it("adds the plugin to the game", function() {
				expect(game.Sometype).toBe(plugin);
			});
			it("does not add a plugin twice", function() {
				game.Plugins.add(plugin);
				var count = 0;
				var plugins = game.Plugins.plugins.Sometype;

				for(var i = 0, len = plugins.length; i < len; i++) {
					if(plugins[i] === plugin) count++;
				}

				expect(count).toEqual(1);
			});

		});

		describe("remove", function() {
			game.Plugins.plugins.Sometype = [];
			game.Plugins.add(plugin);
			var result = game.Plugins.remove("some-plugin");

			it("returns Plugins", function() {
				expect(result).toBe(game.Plugins);
			});
			it("removes the plugin from the plugins list", function() {
				game.Plugins.remove("some-plugin");
				expect(game.Plugins.plugins.Sometype).not.toContain(plugin);
			});
			it("removes the plugin from the game", function() {
				expect(game.Sometype).toBeNull();
			});
			it("replaces the plugin by the last added plugin", function() {
				var otherPlugin = game.Utils.merge(plugin, {name:"another-plugin"});
				game.plugin(otherPlugin).plugin(plugin);
				game.Plugins.remove("some-plugin");
				expect(game.Sometype).toBe(otherPlugin);
			});

		});

	});

});