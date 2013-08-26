Object.Utils = {

	prototype: {

		attempt: function attempt(methodName) {
			if (methodName === "attempt") {
				throw new Error("Recursive call to attempt() detected");
			}

			if (this[methodName]) {
				var args = Array.prototype.slice.call(arguments, 1);

				try {
					return this[methodName].apply(this, args);
				}
				catch (error) {
					return undefined;
				}
			}
		},

		merge: function merge(destination) {
			var key, args = Array.prototype.slice.call(arguments, 1), i = 0, length = args.length, arg;

			for (i; i < length; i++) {
				arg = args[i];

				for (key in arg) {
					if (arg.hasOwnProperty(key)) {
						destination[key] = arg[key];
					}
				}
			}

			arg = args = null;

			return this;
		},

		chainMergeArray: function chainMergeArray(arr, key) {
			var result = [];
			var proto = arr.__proto__, property;

			while (proto) {
				if (proto.hasOwnProperty(key)) {
					property = (proto[key] instanceof Array) ? proto[key] : [ proto[key] ];
					result.push.apply(result, property);
				}

				proto = proto.__proto__;
			}

			proto = property = null;

			return result;
		},

		chainMerge: function chainMerge(o, key) {
			var result = {};
			var proto = o.__proto__;

			while(proto) {
				if (proto.hasOwnProperty(key) && proto[key]) {
					this.safeMerge(result, proto[key]);
				}

				proto = proto.__proto__;
			}

			proto = null;

			return result;
		},

		safeMerge: function safeMerge(a, b) {
			for (var key in b) {
				if (b.hasOwnProperty(key) && !a[key]) {
					a[key] = b[key];
				}
			}

			a = b = null;
		}

	}

};
