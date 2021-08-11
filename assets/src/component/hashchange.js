import debounce from '../utils/debounce';

const regexp       = new RegExp(/^#[^ ]+$/);

const getCssNumber = function(element,prop){
    let value = null;
    if( element ) {
        value = getComputedStyle(element)[prop];
    }
    return parseInt(value) || 0;
}
const getOffset = function (elem) {
    let header   = document.querySelector('.app-header');
    let previous = elem.previousElementSibling;
    return Math.round(header.offsetHeight) + (getCssNumber(previous,'marginBottom') || 0 );
}

const scroll = function(){
    let offset,rect,elem,hash;
    hash = location.hash;
    elem = hash ? document.querySelector(hash) : null;
    if( elem ) {
        rect = elem.getBoundingClientRect();
        offset = window.pageYOffset + Math.round(rect.top) - getOffset(elem);
        window.scrollTo(window.pageXOffset,offset);
    }
}

const match = function () {
    let href = location.href, expr , attr;
    let list = document.querySelectorAll('a[href],[data-rel]');
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

const callback = debounce(scroll);

window.addEventListener('hashchange', match , {passive: true});
window.addEventListener('hashchange', callback, {passive: true});
window.addEventListener('load', callback, {passive: true});

match();

