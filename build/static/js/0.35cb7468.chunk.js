(this["webpackJsonpmobile-ramen-test-jucasero-app"]=this["webpackJsonpmobile-ramen-test-jucasero-app"]||[]).push([[0],{614:function(t,e,n){"use strict";n.r(e),n.d(e,"createSwipeBackGesture",(function(){return o}));var r=n(11),a=n(35),i=n(61),o=function(t,e,n,o,c){var u=t.ownerDocument.defaultView,s=Object(a.a)(t),f=function(t){return s?-t.deltaX:t.deltaX};return Object(i.createGesture)({el:t,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:function(t){return function(t){var e=t.startX;return s?e>=u.innerWidth-50:e<=50}(t)&&e()},onStart:n,onMove:function(t){var e=f(t)/u.innerWidth;o(e)},onEnd:function(t){var e=f(t),n=u.innerWidth,a=e/n,i=function(t){return s?-t.velocityX:t.velocityX}(t),o=i>=0&&(i>.2||e>n/2),h=(o?1-a:a)*n,p=0;if(h>5){var b=h/Math.abs(i);p=Math.min(b,540)}c(o,a<=0?.01:Object(r.h)(0,a,.9999),p)}})}}}]);
//# sourceMappingURL=0.35cb7468.chunk.js.map