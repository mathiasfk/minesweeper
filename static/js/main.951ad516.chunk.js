(this.webpackJsonpminesweeper=this.webpackJsonpminesweeper||[]).push([[0],{10:function(t,e,n){},12:function(t,e,n){"use strict";n.r(e);var r=n(1),c=n.n(r),a=n(4),i=n.n(a),u=(n(9),n(2)),s=(n(10),n(0)),o=function(t){var e=Object(r.useState)(""),n=Object(u.a)(e,2),c=n[0],a=n[1];Object(r.useEffect)((function(){return a(t.status)}),[t.status]);return Object(s.jsx)("div",{className:"Cell "+c,onClick:function(){return e=t.index,void t.onClick(e);var e}})},d=function(t){var e={gridTemplateColumns:"auto ".repeat(Math.sqrt(t.size))};return Object(s.jsx)("div",{className:"Board",style:e,children:t.cells.map((function(e){return Object(s.jsx)(o,{index:e.index,onClick:t.onClick,status:e.data.status},e.index)}))})},j=36,l=Math.sqrt(j)-1,f=function(t){return t%Math.sqrt(j)===0},b=function(t){return(t+1)%Math.sqrt(j)===0},O=function(t){return t<Math.sqrt(j)},x=function(t){var e=Math.sqrt(j);return t>=j-e};var h=function(){var t=Object(r.useState)(0),e=Object(u.a)(t,2),n=e[0],c=e[1],a=Object(r.useState)(0),i=Object(u.a)(a,2),o=i[0],h=i[1],v=Object(r.useState)(!1),m=Object(u.a)(v,2),p=m[0],g=m[1],k=Object(r.useState)(!1),C=Object(u.a)(k,2),M=C[0],S=C[1],w=Object(r.useState)([]),N=Object(u.a)(w,2),q=N[0],B=N[1],F=function(){for(var t=[],e=0,n=0;n<j;n++){var r=!1;Math.random()<.2&&e<l&&(r=!0,e++),console.log(e),t.push({index:n,data:{mine:r,status:"unknown"}})}return t};Object(r.useEffect)((function(){return B(F())}),[]);var E=function(t){var e=(t+j)%j;return q.some((function(t){return t.index===e&&t.data.mine}))};return Object(s.jsxs)("div",{className:"App",children:[Object(s.jsxs)("header",{className:"App-header",children:[M&&!p?"You won! - ":"",p?"Game over - ":"","Score: ",n,Object(s.jsx)("br",{}),"High score: ",o]}),Object(s.jsx)("div",{className:"Button-container",children:Object(s.jsx)("button",{onClick:function(){B(F()),g(!1),h(n>o?n:o),c(0),S(!1)},children:"Restart"})}),Object(s.jsx)("div",{className:"Button-container",children:M?Object(s.jsx)("button",{onClick:function(){B(F()),g(!1),S(!1)},children:"Next"}):Object(s.jsx)(s.Fragment,{})}),Object(s.jsx)("div",{className:"Board-container",children:Object(s.jsx)(d,{size:j,cells:q,onClick:function(t){if(!p&&!M){var e=E(t);"unknown"!==function(t){var e=(t+j)%j;return q.filter((function(t){return t.index===e}))[0].data.status}(t)||e||c(n+100);var r=function(t){var e=Math.sqrt(j),n=0;return!f(t)&&E(t-1)&&(n+=1),!b(t)&&E(t+1)&&(n+=1),!O(t)&&E(t-e)&&(n+=1),!x(t)&&E(t+e)&&(n+=1),O(t)||f(t)||!E(t-e-1)||(n+=1),O(t)||b(t)||!E(t-e+1)||(n+=1),x(t)||b(t)||!E(t+e+1)||(n+=1),x(t)||f(t)||!E(t+e-1)||(n+=1),n}(t),a=q.filter((function(t){return"unknown"===t.data.status})).reduce((function(t,e){return t+1}),0),i=q.filter((function(t){return t.data.mine})).reduce((function(t,e){return t+1}),0);console.log(a),function(t,e){var n=q.map((function(n){return n.index===t?{index:n.index,data:{mine:n.mine,status:e}}:n}));B(n)}(t,function(t,e){var n="";return t?n="exploded":0===e?n="clear":e>0&&(n="danger-".concat(e)),n}(e,r)),a<=i+1&&(S(!0),c(n+500)),e&&g(!0)}}})})]})},v=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,13)).then((function(e){var n=e.getCLS,r=e.getFID,c=e.getFCP,a=e.getLCP,i=e.getTTFB;n(t),r(t),c(t),a(t),i(t)}))};i.a.render(Object(s.jsx)(c.a.StrictMode,{children:Object(s.jsx)(h,{})}),document.getElementById("root")),v()},9:function(t,e,n){}},[[12,1,2]]]);
//# sourceMappingURL=main.951ad516.chunk.js.map