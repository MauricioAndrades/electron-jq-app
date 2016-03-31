(function e(t, n, r) {
  function s(o, u) {
	if (!n[o]) {
	  if (!t[o]) {
		var a = typeof require == "function" && require;
		if (!u && a) return a(o, !0);
		if (i) return i(o, !0);
		var f = new Error("Cannot find module '" + o + "'");
		throw f.code = "MODULE_NOT_FOUND", f
	  }
	  var l = n[o] = {
		exports: {}
	  };
	  t[o][0].call(l.exports, function(e) {
		var n = t[o][1][e];
		return s(n ? n : e)
	  }, l, l.exports, e, t, n, r)
	}
	return n[o].exports
  }
  var i = typeof require == "function" && require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s
})({
  "./embed-client.js": [function(require, module, exports) {
	var __hoisted_0 = function(e) {
		return !!e
	  },
	  __hoisted_1 = function(e) {
		return "env[]=" + encodeURIComponent(e)
	  },
	  __hoisted_2 = function(e) {
		this._sendMessage({
		  method: "get_source"
		}, e)
	  },
	  __hoisted_3 = function(e, t) {
		this._sendMessage({
		  method: "set_source",
		  source: e
		}, t)
	  },
	  __hoisted_4 = function(e) {
		this._sendMessage({
		  method: "evaluate"
		}, e)
	  },
	  __hoisted_5 = function(e) {
		var t = e.textContent || e.innerText || "";
		t = t.replace(/\r\n/g, "\n"), t = t.replace(/\r/g, "\n");
		for (var n = t.split("\n"); n.length && 0 === n[0].trim()
		  .length;) n.shift();
		var o = n.length > 0 && n[0].length - n[0].replace(/^\s+/, "")
		  .length;
		return n.map(function(e) {
			return e.substring(0, o)
			  .match(/[^\s]/) ? e : e.substring(o)
		  })
		  .join("\n")
	  },
	  __hoisted_6 = function(e) {
		return /^data-env-/.test(e.name)
	  },
	  __hoisted_7 = function(e) {
		return e.name.replace("data-env-", "")
		  .toLowerCase() + "=" + e.value
	  },
	  __hoisted_8 = function() {
		"use strict";

		function e() {
		  function e() {
			window[a] && window[a]()
		  }
		  n = !0;
		  var o = t.getAttribute("data-element-id"),
			i = t.getAttribute("data-notebook-url"),
			a = t.getAttribute("data-load-callback"),
			r = t.getAttribute("data-node-version"),
			s = t.getAttribute("data-title"),
			d = t.getAttribute("data-mode"),
			_ = [].filter.call(t.attributes, __hoisted_6)
			.map(__hoisted_7);
		  if (o || i) {
			var l = o && document.getElementById(o),
			  c = t.hasAttribute("data-read-only");
			if (l) {
			  var h = Tonic.sourceFromElement(l);
			  l.innerHTML = ""
			} else l = document.createElement("div"), l.className = "tonic-notebook-container", t.parentNode.replaceChild(l, t);
			Tonic.createNotebook({
			  element: l,
			  source: h,
			  notebookURL: i,
			  readOnly: c,
			  env: _,
			  mode: d,
			  nodeVersion: r,
			  title: s,
			  onLoad: a && e
			})
		  }
		}
		var t = document.currentScript,
		  n = !1;
		if (!document.currentScript) {
		  var o = document.getElementsByTagName("script");
		  t = o[o.length - 1]
		}
		if (!window.Tonic) {
		  var i = document.createElement("a");
		  i.href = t.src;
		  var a = i.host.split(".");
		  0 === a[0].indexOf("qa") ? a[0] = "qa" : 3 === a.length && (a = a.slice(1));
		  var r = "https://" + a.join("."),
			s = 0,
			d = 1,
			_ = {},
			l = function(e) {
			  var t = this.name = "tonic-embed-" + (s++)
				.toString();
			  window.Tonic["$" + t] = this;
			  var n = e.element,
				o = e.source,
				i = e.readOnly,
				a = (e.mode, e.notebookURL),
				d = e.nodeVersion,
				l = e.title,
				c = 130,
				h = 40;
			  if (o && (c = Math.max(21 * o.split("\n")
				  .length + 42, c)), a) {
				var u = a.split("/");
				if ("" === u[0] && u.shift(), "" === u[u.length - 1] && u.pop(), u.length < 2) a = null;
				else {
				  var m = u[0],
					g = u[1],
					v = ["", "users", m, "repositories", g];
				  v = v.concat(u.length > 2 ? u.slice(2) : ["branches", "master"]), a = v.join("/")
				}
			  }
			  var p = {
				  name: t,
				  notebook: a,
				  source: (o || "")
					.trim(),
				  location: window.location.toString(),
				  readOnly: i,
				  mode: e.mode,
				  nodeVersion: d,
				  sendResults: !!e.onResult,
				  title: l
				},
				f = "?" + Object.keys(p)
				.map(function(e) {
				  return void 0 !== p[e] && null !== p[e] ? e + "=" + encodeURIComponent(p[e]) : void 0
				})
				.filter(__hoisted_0)
				.join("&");
			  Array.isArray(e.env) && (f += "&" + e.env.map(__hoisted_1)
				.join("&"));
			  var b = this.iframe = document.createElement("iframe");
			  b.src = r + "/e" + f, b.style.height = c + h + "px", b.style.width = "100%", b.style.width = "calc(100% + 200px)", b.style.padding = "0px", b.style.margin = "0px", b.style.marginLeft = "calc(-100px)", b.style.border = "0px", b.style.backgroundColor = "transparent", b.frameBorder = "0", b.allowTransparency = "true", b.name = t, n.appendChild(b);
			  var y = require("object-serialization/lib/from-object-serialization"),
				w = require("object-description/lib/revive");
			  window.addEventListener("message", function(n) {
				try {
				  if (n.origin !== r) return;
				  var o = JSON.parse(n.data);
				  if (o && o.name === t) switch (o.event) {
					case "height":
					  b.style.height = o.height + h + "px";
					  break;
					case "loaded":
					  e.onLoad && e.onLoad(this);
					  break;
					case "url":
					  this.URL = r + o.url, this.endpointURL = "https://tonicdev.io" + o.url, e.onURLChanged && e.onURLChanged(this);
					  break;
					case "evaluate":
					  this.evaluationID = o.evaluationID, e.onEvaluate && e.onEvaluate(this.evaluationID);
					  break;
					case "result":
					  if (e.onResult) {
						var i = y(o.result.value);
						w(i), o.result.value = i, e.onResult(o.result)
					  }
					  break;
					case "callback":
					  var a = _[o.message_id];
					  delete _[o.message_id], a(o.message)
				  }
				} catch (s) {}
			  }.bind(this))
			};
		  l.prototype._sendMessage = function(e, t) {
			var n = d++;
			_[n] = t;
			var o = {
			  name: this.name,
			  message_id: n,
			  message: e
			};
			this.iframe.contentWindow.postMessage(JSON.stringify(o), r)
		  }, l.prototype.getSource = __hoisted_2, l.prototype.setSource = __hoisted_3, l.prototype.evaluate = __hoisted_4, window.Tonic = {
			createNotebook: function(e) {
			  return new l(e)
			},
			sourceFromElement: __hoisted_5
		  }
		}
		"complete" === document.readyState ? e() : window.addEventListener("load", e)
	  },
	  __hoisted_0 = __hoisted_0,
	  __hoisted_1 = __hoisted_1,
	  __hoisted_2 = __hoisted_2,
	  __hoisted_3 = __hoisted_3,
	  __hoisted_4 = __hoisted_4,
	  __hoisted_5 = __hoisted_5,
	  __hoisted_6 = __hoisted_6,
	  __hoisted_7 = __hoisted_7,
	  __hoisted_8 = __hoisted_8;
	__hoisted_8();
  }, {
	"object-description/lib/revive": "modules/object-description/lib/revive.js",
	"object-serialization/lib/from-object-serialization": "modules/object-serialization/lib/from-object-serialization.js"
  }],
  "modules/object-description/lib/revive.js": [function(require, module, exports) {
	function fromObjectDescription(e) {
	  if (hasOwnProperty.call(e, "value")) return e.value;
	  if ("undefined" === e.type) return void 0;
	  var r = instantiateObject(e);
	  return e.value = r, assignProperties(e, r), r
	}

	function instantiateObject(e) {
	  if (e.isStringObject) return new String(e.valueOf.value);
	  if (e.isNumberObject) return new Number(e.valueOf.value);
	  if (e.isBooleanObject) return new Boolean(e.valueOf.value);
	  if (e.isArray) return new Array(e.properties["@length"].value.value);
	  if (e.isRegExp) {
		var r = (e.properties["@global"].value.value ? "g" : "") + (e.properties["@ignoreCase"].value.value ? "i" : "") + (e.properties["@multiline"].value.value ? "m" : "");
		return new RegExp(e.properties["@source"].value.value, r)
	  }
	  return e.isDate ? new Date(e.numberValue.value) : {}
	}

	function assignProperties(e, r) {
	  if (e.properties)
		for (var a = e.properties, t = Object.keys(a), i = 0, n = t.length; n > i; ++i) {
		  var u = t[i],
			l = a[u];
		  (!hasOwnProperty.call(l, "flags") || l.flags & enumerable) && hasOwnProperty.call(l, "value") && (r[l.key] = fromObjectDescription(l.value))
		}
	}
	var hasOwnProperty = Object.prototype.hasOwnProperty,
	  missing = {};
	module.exports = fromObjectDescription;
	var writable = 4,
	  enumerable = 2,
	  configurable = 1;
  }, {}],
  "modules/object-serialization/lib/from-object-serialization.js": [function(require, module, exports) {
	var __hoisted_0 = function() {
		return []
	  },
	  __hoisted_1 = function() {
		return Object.create(null)
	  },
	  __hoisted_2 = function(t, e) {
		return t(e), e
	  },
	  __hoisted_3 = function(t, e) {
		function r(e) {
		  if (-1 === e) return null;
		  if (-2 === e) return void 0;
		  if (-3 === e) return 0 / 0;
		  if (-4 === e) return -0;
		  if (-5 === e) return -1 / 0;
		  if (-6 === e) return 1 / 0;
		  if (n.hasOwnProperty(e)) return n[e];
		  var _ = t.objects[e];
		  if ("object" != typeof _) return n[e] = _, _;
		  var i = _[0] ? o() : u();
		  return _.length <= 1 ? i : d(function(t) {
			n[e] = t;
			for (var i = 1, o = _.length; o > i; i += 2) {
			  var u = _[i];
			  s("string" == typeof u ? u : r(u), r(_[i + 1]), t)
			}
		  }, i)
		}

		function _(t, e, r) {
		  r[t] = e
		}
		var i = e && e.immutable,
		  n = (t.objects, []),
		  o = i ? I.List : __hoisted_0,
		  u = i ? I.Map : __hoisted_1,
		  s = i ? RI.set : _,
		  d = i ? R.invoker(1, "withMutations") : __hoisted_2;
		return r(t.index)
	  },
	  __hoisted_0 = __hoisted_0,
	  __hoisted_1 = __hoisted_1,
	  __hoisted_2 = __hoisted_2,
	  __hoisted_3 = __hoisted_3;
	try {
	  var R = require("ramda"),
		I = require("immutable"),
		RI = require("ramda-immutable")
	} catch (e) {}
	module.exports = __hoisted_3;
  }, {
	"immutable": false,
	"ramda": false,
	"ramda-immutable": false
  }]
}, {}, ["./embed-client.js"]);
