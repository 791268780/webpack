require('../css/config.css')
require('../css/index.styl');
require('@babel/polyfill')

$('.d1').text('has')

var img = require('../img/index/eth.png')
document.getElementsByClassName('d2')[0].style.backgroundImage = 'url(" '+  img + ' ")'   //backgroundImage = `url(${ img })`
console.log( document.getElementsByClassName('d2')[0] )

console.log('这是主页2')