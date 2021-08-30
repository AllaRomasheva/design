import smoothScroll from 'smoothscroll-polyfill';

window.__forceSmoothScrollPolyfill__ = true;

smoothScroll.polyfill();

import './component/hashchange';
import './component/scroll';
import './component/card';
import './component/cover';
