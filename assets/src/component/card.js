import bind from '../utils/bind';

bind(document,'click','[data-flip]',function(ev){
    ev.preventDefault();
    ev.target.closest('[data-card]')
    console.log(ev.target.closest('[data-card]'));
})
