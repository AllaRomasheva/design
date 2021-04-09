var sjt = {};

sjt.utils = {};

sjt.window = window;

sjt.document = document;

sjt.location = location;

sjt.history = history;

sjt.hasCreateEvent = ('createEvent' in document);

sjt.historySupport = !!(sjt.history && sjt.history.pushState);

sjt.toArray = function (value) {
    return Array.prototype.slice.call(value);
};

sjt.findAll = function (selector, parent) {
    return this.toArray((parent || this.document).querySelectorAll(String(selector)));
};

sjt.find = function (selector, parent) {
    return (parent || this.document).querySelector(String(selector)) || null;
};

sjt.getCssValue = function(element,prop){
    var value = null;
    if( element ) {
        value = getComputedStyle(element)[prop];
    }
    return parseInt(value);
};

sjt.requestAnimationFrame = sjt.window.requestAnimationFrame || (function () {
    return window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            sjt.window.setTimeout(callback, 1000 / 60);
        };
})();

sjt.domReady = function () {
    return (this.document.readyState === 'complete' ||
        this.document.readyState === 'loaded' ||
        this.document.readyState === 'interactive');
};

sjt.transitionEvent = (function () {
    var t, el = this.document.createElement('fakeelement');
    var transitions = {
        'transition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
    }
    for (t in transitions) {
        if (el.style[t] !== undefined) {
            return transitions[t];
        }
    }
})();

sjt.trigger = function (elem, name) {
    var event;
    if (this.hasCreateEvent) {
        event = this.document.createEvent('HTMLEvents');
        event.initEvent(name, true, true);
    } else {
        event = this.document.createEventObject();
        event.eventType = name;
    }
    event.eventName = name;
    if (this.hasCreateEvent) {
        elem.dispatchEvent(event);
    } else {
        elem.fireEvent('on' + event.eventType, event);
    }
};

sjt._event_ = function (c, a) {
    var s = a.length === 2,
        e = s ? this.window : a[0],
        n = s ? a[0] : a[1],
        f = s ? a[1] : a[2];
    e[c].apply(e, [n, f]);
};

sjt.on = function () {
    this._event_('addEventListener', arguments);
};

sjt.off = function () {
    this._event_('removeEventListener', arguments);
};

sjt.replaceChild = function (item, replacer) {
    item.parentNode && item.parentNode.replaceChild(replacer, item);
};

sjt.addClass = function (el, name) {
    el.classList.add(name);
};

sjt.removeClass = function (el, name) {
    el.classList.remove(name);
};

sjt.toggleClass = function (el, name) {
    el.classList.toggle(name);
};

module.exports = sjt;

