!function(t){function e(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return t[r].call(a.exports,a,a.exports,e),a.l=!0,a.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e,n){"use strict";function r(){e.state.height=window.innerHeight,e.state.width=window.innerWidth,u.width=e.state.width,u.height=e.state.height,d.width=e.state.width,d.height=e.state.height}function a(t){c.clearRect(0,0,u.width,u.height),c.fillStyle="#000",c.fillRect(0,0,c.canvas.width,c.canvas.height);var n=o.renderBgPattern(e.state,t);i.drawKaleidoscope({ctx:c,image:n,radius:Math.max(120,Math.max(e.state.width/8,e.state.height/8))}),h.drawImage(u,0,0),window.requestAnimationFrame(a)}Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),o=n(2),u=document.getElementById("kaleido"),c=u.getContext("2d"),d=document.getElementById("kaleido-filter"),h=d.getContext("2d");e.state={mouseX:0,mouseY:0},document.addEventListener("mousemove",function(t){e.state.mouseX=t.pageX,e.state.mouseY=t.pageY},!1),window.addEventListener("resize",r,!1),r(),window.requestAnimationFrame(a)},function(t,e,n){"use strict";function r(t){var e=t.ctx,n=t.image,r=t.radius;if(n){var a=function(t){return t*r};e.save(),e.translate(e.canvas.width/2,e.canvas.height/2),f.forEach(function(t,o){e.save(),e.globalAlpha=1-.075*o,t.forEach(function(t,u){e.save(),e.beginPath(),e.moveTo(a(t[0].x),a(t[0].y)),e.lineTo(a(t[1].x),a(t[1].y)),e.lineTo(a(t[2].x),a(t[2].y)),e.closePath(),e.clip();var c=d(t);e.translate(a(c.x),a(c.y));var h=l[o]?l[o][u%l[o].length]:0;e.rotate(i(60*h)),o%2==1&&e.scale(-1,1),l[o]&&e.drawImage(n,-r,-r,2*r,2*r),e.restore()}),e.restore()}),e.restore()}}Object.defineProperty(e,"__esModule",{value:!0});var a=function(t,e){return{x:t,y:e}},i=function(t){return Math.PI/180*t},o=function(t,e){return a(t.x+e.x,t.y+e.y)},u=function(t,e){return a(t.x-e.x,t.y-e.y)},c=function(t,e,n){var r=i(n),c=u(e,t),d=a(c.x*Math.cos(r)-c.y*Math.sin(r),c.x*Math.sin(r)+c.y*Math.cos(r));return o(d,t)},d=function(t){return a((t[0].x+t[1].x+t[2].x)/3,(t[0].y+t[1].y+t[2].y)/3)},h=function(t,e){return[t,c(e,t,60),e]},s=[{drawAt:[0],length:1},{drawAt:[0,1],length:3},{drawAt:[0,1,3],length:6},{drawAt:[1,3,6,7],length:9},{drawAt:[0,1,4,7,9],length:12},{drawAt:[1,3,6,7,10,13],length:15},{drawAt:[0,1,4,7,9,12,15],length:18},{drawAt:[1,3,6,9,10,13,16,19],length:21},{drawAt:[0,1,4,9],length:24}],l=[[0],[5,3,1],[4,2],[3,1,3,1,5,1,5,3,5],[0,2,0,4],[1,5,3,5,1,5,3,1,3,5,3,1,5,1,3],[2,4,0,4,2,0],[5,3,1,5,1,3,5,3,1,5,3,5,1,3,1,5,3,1,3,5,1],[4,0,2,4,2,0,4,2],[3,1,5,3,1,5,3,1,5,3,1,5]],f=s.reduce(function(t,e){return t.concat([t[t.length-1].map(function(t,n){return t.map(function(t,r,a){var i=3*n+r,o=-1!==e.drawAt.indexOf(i%e.length),u=a[r<2?r+1:0];return o&&h(t,u)}).filter(function(t){return Boolean(t)})}).reduce(function(t,e){return void 0===t&&(t=[]),t.concat(e)})])},[[function(t,e){var n=a(t.x,t.y-e);return[n,c(t,n,120),c(t,n,240)]}(a(0,0),1)]]);e.drawKaleidoscope=r},function(t,e,n){"use strict";function r(t,e){if(!a.complete)return!1;o.save(),o.clearRect(0,0,i.width,i.height);var n=t.width/2,r=t.height/2,u=t.mouseX-n,c=t.mouseY-r,d=Math.atan2(c,u)+e/2e4%360;return o.translate(i.width/2,i.height/2),o.rotate(d),o.drawImage(a,-a.width/2,-a.height/2),o.restore(),i}Object.defineProperty(e,"__esModule",{value:!0});var a=new Image;a.src="pattern.jpg",a.addEventListener("load",function(){i.width=a.width,i.height=a.height},!1);var i=document.createElement("canvas"),o=i.getContext("2d");e.renderBgPattern=r}]);