var $ = require('jquery.control');

var debounce = require('./src/debounce');

(function () {
    var regexp       = new RegExp(/^#[^ ]+$/);
    var getCssNumber = function(element,prop){
        var value = null;
        if( element ) {
            value = getComputedStyle(element)[prop];
        }
        return parseInt(value) || 0;
    };
    var getOffset = function (elem) {
        var header   = document.querySelector('.app-header');
        var previous = elem.previousElementSibling;
        return Math.round(header.offsetHeight) + (getCssNumber(previous,'marginBottom') || 0 );
    }
    var scroll = function(){
        var offset,rect,elem,hash;
        hash = location.hash;
        elem = hash ? document.querySelector(hash) : null;
        if( elem ) {
            rect = elem.getBoundingClientRect();
            offset = window.pageYOffset + Math.round(rect.top) - getOffset(elem);
            window.scrollTo(window.pageXOffset,offset);
        }
    };
    var callback = debounce(scroll);
    window.addEventListener('hashchange', callback, {passive: true});
    window.addEventListener('load', callback, {passive: true});
 })();

(function(){
    var canvas = document.querySelector('.app-bullets');
    var ctx = canvas.getContext("2d");
    canvas.setAttribute('width',canvas.clientWidth);
    canvas.setAttribute('height',canvas.clientHeight);
    var randomColor = function(){
        var r = Math.floor(Math.random()*255);
        var g = Math.floor(Math.random()*255);
        var b = Math.floor(Math.random()*255);
        return "rgba("+r+","+g+","+b+",.2)";
    };
    var draw = function() {
        var pi     =  Math.PI*2;
        var width  = canvas.clientWidth;
        var height = canvas.clientHeight;
        var size   = (height/10);
        ctx.clearRect(0,0,width,height);
        (function(index){
            if( index >= 2400) return;
            var callback = arguments.callee;
            var radius  = Math.floor(Math.random() * size );
            var radius2 = radius * 2;
            var padding = Math.min(height / 5 , Math.floor(Math.random() * ( height / 4 )  ) );
            var x = Math.floor(Math.random() * width );
            var y = Math.floor(Math.random() * height );
            //x = Math.min( Math.max(padding + radius2 , x ) , width - padding - radius2);
            //y = Math.min( Math.max(padding + radius2, y ) , height - padding - radius2);
            ctx.beginPath();
            ctx.arc(x,y,radius,pi,0,false);
            ctx.fillStyle = randomColor();
            ctx.fill();
            ctx.closePath();
            requestAnimationFrame(function(){
                callback(++index);
            });
        })(0);
    }
})();


(function () {
    var callback;
    var html = document.documentElement;
    var container = document.scrollingElement;
    var scroll = 0;
    function scroller() {
        var scrollTop = container.scrollTop;
        var progress  = parseFloat(scrollTop / ((html.scrollHeight - html.clientHeight) / 100) ).toFixed(2);
        html.style.setProperty('--progress',String(progress));
        html.classList.toggle('scroll', scrollTop > 0);
        html.classList.toggle('scroll-bottom', scrollTop > 0 && (scroll < scrollTop));
        html.classList.toggle('scroll-top', scrollTop > 0 && (scroll > scrollTop));
    }
    callback = debounce(scroller);
    window.addEventListener('orientationchange', callback, {passive: true});
    window.addEventListener('resize', callback, {passive: true});
    window.addEventListener('scroll', callback, {passive: true});
    scroller();
})();



(function () {
    function match() {
        var href = location.href, expr , attr;
        var list = document.querySelectorAll('a[href],[data-rel]');
        [].slice.call(list).filter(function (el) {
            el.classList.remove('active');
            expr = el.getAttribute('data-rel');
            attr = el.getAttribute('href');
            if( attr === '#') return;
            return expr ? href.match(expr) : el.href ? href.indexOf(attr) !== -1 : false;
        }).map(function (el) {
            el.classList.add('active');
        });
    }
    window.addEventListener('hashchange', match);
    match();
})();


$.createControl('card',{
    create: function(){
        this.on('click','[data-flip]','flip');
    },
    flip: function(el,ev){
        ev.preventDefault();
        this.element.toggleClass('active');
    }
})

$(document).initControls();