define("Core", function() {

	define("functions", function() {

		it("should have an init() function", function() {
			expect(typeof game.init).toBe("function");
		});
		it("should have a load() function", function() {
			expect(typeof game.load).toBe("function");
		});
		it("should have a start() function", function() {
			expect(typeof game.start).toBe("function");
		});
		it("should have a pause() function", function() {
			expect(typeof game.pause).toBe("function");
		});
		it("should have a stop() function", function() {
			expect(typeof game.stop).toBe("function");
		});
		it("should have a Loop() function", function() {
			expect(typeof game.Loop).toBe("function");
		});
		it("should have a plugin() function", function() {
			expect(typeof game.plugin).toBe("function");
		});
		it("should have a category() function", function() {
			expect(typeof game.category).toBe("function");
		});
		it("should have a Utils property", function() {
			expect(game.Utils).toBe(jasmine.any(Object));
		});
		it("should have a Plugins property", function() {
			expect(game.Plugins).toBe(jasmine.any(Object));
		});
		it("should have a Categories property", function() {
			expect(game.Categories).toBe(jasmine.any(Object));
		});

		define("init", function() {

			var beforeInit = jasmine.createSpy("beforeinit");
			var afterInit = jasmine.createSpy("afterinit");
			game.on("beforeinit", beforeInit);
			game.on("init", afterInit);

			spyOn(game.Plugins, "Init").and.callThrough();
			var result = game.init();

			it("should return the game", function() {
				expect(result).toBe(game);
			});
			it("should call game.Plugins.Init() with the game as only argument", function() {
				expect(game.Plugins.Init).toHaveBeenCalledWith(game);
			});
			it("should set initTime", function() {
				expect(game.initTime).not.toBeNull();
			});
			it("should emit 'beforeinit'", function() {
				expect(beforeInit).toHaveBeenCalledWith(game);
				expect(beforeInit.calls.count()).toBe(1);
			});
			it("should emit 'init'", function() {
				expect(afterInit).toHaveBeenCalledWith(game);
				expect(afterInit.calls.count()).toBe(1);
			});

		})

	})

})