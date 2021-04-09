var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
var cancelAnimationFrame  = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

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
    }
}