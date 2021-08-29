(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _bind = require("../utils/bind");

(0, _bind.bind)(document, 'click', '[data-flip]', function (ev) {
  var el = ev.target;
  var card = el.closest('[data-card]');
  card.classList.toggle('active');

  if (el.hasAttribute('data-flip')) {
    ev.preventDefault();
  }
});

},{"../utils/bind":6}],2:[function(require,module,exports){
"use strict";

var _find = require("../utils/find");

var cover = function cover(el) {
  var url = el.getAttribute('data-cover');
  el.removeAttribute('data-cover');
  el.style.backgroundImage = "url(".concat(url, ")");
  el.style.backgroundSize = 'cover';
};

if ('IntersectionObserver' in window) {
  var observer = new IntersectionObserver(function (entries) {
    entries.filter(function (item) {
      return item.isIntersecting;
    }).forEach(function (item) {
      cover(item.target);
      observer.unobserve(item.target);
    });
  });
  (0, _find.find)('[data-cover]').forEach(function (el) {
    observer.observe(el);
  });
} else {
  (0, _find.find)('[data-cover]').forEach(cover);
}

},{"../utils/find":8}],3:[function(require,module,exports){
"use strict";

var _debounce = require("../utils/debounce");

var _bind = require("../utils/bind");

var regexp = new RegExp(/^#[^ ]+$/);

var getCssNumber = function getCssNumber(element, prop) {
  var value = null;

  if (element) {
    value = getComputedStyle(element)[prop];
  }

  return parseInt(value) || 0;
};

var position = function position(elem) {
  return elem.getBoundingClientRect();
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
    rect = position(elem);
    offset = window.pageYOffset + Math.round(rect.top) - getOffset(elem);
    window.scrollTo(window.scrollX, offset);
  }
};

var click = function click(ev) {
  if (ev.target.hash && ev.target.hash === location.hash) {
    ev.preventDefault();
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

var callback = (0, _debounce.debounce)(scroll);
(0, _bind.bind)(document, 'click', 'a', click);
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

},{"../utils/bind":6,"../utils/debounce":7}],4:[function(require,module,exports){
"use strict";

var _debounce = require("../utils/debounce");

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
  scroll = scrollTop;
};

var callback = (0, _debounce.debounce)(scroller);
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

},{"../utils/debounce":7}],5:[function(require,module,exports){
"use strict";

require("./component/hashchange");

require("./component/scroll");

require("./component/card");

require("./component/cover");

},{"./component/card":1,"./component/cover":2,"./component/hashchange":3,"./component/scroll":4}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bind = bind;

function bind(parent, event, selector, callback) {
  return parent.addEventListener(event, function (ev) {
    if (ev.target.matches(selector) || ev.target.closest(selector)) {
      var target = ev.target.matches(selector) ? ev.target : ev.target.closest(selector);
      callback.call(target, ev);
    }
  }, true);
}

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounce = debounce;
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

function debounce(fn) {
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
}

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.find = find;

/**
 *
 * @param selector
 * @param parent
 * @return {Element[]}
 */
function find(selector, parent) {
  return Array.from((parent || document).querySelectorAll(selector));
}

},{}]},{},[5])

