(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _bind = _interopRequireDefault(require("../utils/bind"));

(0, _bind["default"])(document, 'click', '[data-flip]', function (ev) {
  ev.preventDefault();
  ev.target.closest('[data-card]');
  console.log(ev.target.closest('[data-card]'));
});

},{"../utils/bind":5,"@babel/runtime/helpers/interopRequireDefault":7}],2:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _debounce = _interopRequireDefault(require("../utils/debounce"));

var regexp = new RegExp(/^#[^ ]+$/);

var getCssNumber = function getCssNumber(element, prop) {
  var value = null;

  if (element) {
    value = getComputedStyle(element)[prop];
  }

  return parseInt(value) || 0;
};

var getOffset = function getOffset(elem) {
  var header = document.querySelector('.app-header');
  var previous = elem.previousElementSibling;
  return Math.round(header.offsetHeight) + (getCssNumber(previous, 'marginBottom') || 0);
};

var scroll = function scroll() {
  var offset, rect, elem, hash;
  hash = location.hash;
  elem = hash ? document.querySelector(hash) : null;

  if (elem) {
    rect = elem.getBoundingClientRect();
    offset = window.pageYOffset + Math.round(rect.top) - getOffset(elem);
    window.scrollTo(window.pageXOffset, offset);
  }
};

var match = function match() {
  var href = location.href,
      expr,
      attr;
  var list = document.querySelectorAll('a[href],[data-rel]');
  [].slice.call(list).filter(function (el) {
    el.classList.remove('active');
    expr = el.getAttribute('data-rel');
    attr = el.getAttribute('href');
    if (attr === '#') return;
    return expr ? href.match(expr) : el.href ? href.indexOf(attr) !== -1 : false;
  }).map(function (el) {
    el.classList.add('active');
  });
};

var callback = (0, _debounce["default"])(scroll);
window.addEventListener('hashchange', match, {
  passive: true
});
window.addEventListener('hashchange', callback, {
  passive: true
});
window.addEventListener('load', callback, {
  passive: true
});
match();

},{"../utils/debounce":6,"@babel/runtime/helpers/interopRequireDefault":7}],3:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _debounce = _interopRequireDefault(require("../utils/debounce"));

var html = document.documentElement;
var container = document.scrollingElement;
var scroll = 0;

var scroller = function scroller() {
  var scrollTop = container.scrollTop;
  var progress = parseFloat(scrollTop / ((html.scrollHeight - html.clientHeight) / 100)).toFixed(2);
  html.style.setProperty('--progress', String(progress));
  html.classList.toggle('scroll', scrollTop > 0);
  html.classList.toggle('scroll-bottom', scrollTop > 0 && scroll < scrollTop);
  html.classList.toggle('scroll-top', scrollTop > 0 && scroll > scrollTop);
};

var callback = (0, _debounce["default"])(scroller);
window.addEventListener('orientationchange', callback, {
  passive: true
});
window.addEventListener('resize', callback, {
  passive: true
});
window.addEventListener('scroll', callback, {
  passive: true
});
scroller();

},{"../utils/debounce":6,"@babel/runtime/helpers/interopRequireDefault":7}],4:[function(require,module,exports){
"use strict";

require("./component/hashchange");

require("./component/scroll");

require("./component/card");

},{"./component/card":1,"./component/hashchange":2,"./component/scroll":3}],5:[function(require,module,exports){
"use strict";

function bind(parent, event, selector, callback) {
  return parent.addEventListener(event, function (ev) {
    if (ev.target.matches(selector) || ev.target.closest(selector)) {
      var target = ev.target.matches(selector) ? ev.target : ev.target.closest(selector);
      callback.call(target, ev);
    }
  }, true);
}

module.exports = bind;

},{}],6:[function(require,module,exports){
"use strict";

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

module.exports = function debounce(fn) {
  var frame, params;
  return function () {
    params = arguments;

    if (frame) {
      cancelAnimationFrame(frame);
    }

    frame = requestAnimationFrame(function () {
      fn.apply(null, params);
    });
  };
};

},{}],7:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{}]},{},[4])

