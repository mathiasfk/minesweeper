(this.webpackJsonpminesweeper=this.webpackJsonpminesweeper||[]).push([[0],[,,,,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},,function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a,r=n(1),i=n.n(r),c=n(3),s=n.n(c),o=(n(9),n(4));n(10),n(11),n(12);!function(e){e[e.Unknown=0]="Unknown",e[e.Clear=1]="Clear",e[e.Danger=2]="Danger",e[e.Exploded=3]="Exploded",e[e.Flagged=4]="Flagged"}(a||(a={}));var l=n(0),u=function(e,t){var n="";return n=e===a.Danger?"".concat(a[e]).concat(t||""):a[e],"Cell  ".concat(n)},d=function(e){return Object(l.jsx)("div",{"data-testid":"cell",className:u(e.status,e.neighboringMines),onClick:function(){return e.onClick(e.index)},onContextMenu:function(t){e.onRightClick(e.index),t.preventDefault()},children:Object(l.jsx)("p",{children:e.neighboringMines})})},g=function(e){var t={gridTemplateColumns:"auto ".repeat(Math.sqrt(e.size))};return Object(l.jsx)("div",{className:"Board",style:t,"data-testid":"board",children:e.cells.map((function(t){return Object(l.jsx)(d,{index:t.index,onClick:e.onClick,onRightClick:e.onRightClick,status:t.data.status,neighboringMines:t.data.neighboringMines},t.index)}))})};function h(e){return Object(l.jsxs)("header",{className:"App-header","data-testid":"header",children:[e.isWin&&!e.isGameover?"You won! - ":"",e.isGameover?"Game over - ":"","Score: ",e.score,Object(l.jsx)("br",{}),"High score: ",e.highScore,Object(l.jsx)("br",{}),"Win streak: ",e.winStreak,Object(l.jsx)("br",{}),"Mines on this game: ",e.mines]})}var f=function(e,t,n,a,r){return{size:e,cells:m(e,t),mines:t,score:n||0,highScore:a||0,win:!1,winStreak:r||0,gameover:!1}},m=function(e,t){if(t>e)throw RangeError("mineCount should not be larger than size");for(var n=Math.sqrt(e),r=Array.from({length:e},(function(e,t){return{index:t,x:t%n,y:Math.floor(t/n),data:{mine:!1,status:a.Unknown}}})),i=0;i<t;)for(var c=0;c<e&&!(i>=t);c++)if(!r[c].data.mine){var s=Math.random()<.2;r[c].data.mine=s,s&&i++}return r},j=function(e,t,n){var r=Object.assign({},e),i=b(t,n);return r.data.status=i>0?a.Danger:a.Clear,r.data.neighboringMines=i,r},v=function(e){return!e.gameover&&e.cells.filter((function(e){return e.data.status===a.Unknown})).length+e.cells.filter((function(e){return e.data.status===a.Flagged})).length===e.mines},b=function(e,t){var n=e[t];return e.filter((function(e){return x(n,e)})).filter((function(e){return e.data.mine})).length},x=function(e,t){var n=e.x,a=e.y;return[n-1,n,n+1].includes(t.x)&&[a-1,a+1].includes(t.y)||[n-1,n+1].includes(t.x)&&a===t.y},k=function(e,t){var n=e[t];return e.map((function(t){return x(n,t)&&t.data.status!==a.Flagged&&!t.data.mine?j(t,e,t.index):t}))},S=function(e,t){for(var n=e,r=e.filter((function(e){return e.data.status===a.Clear})).length,i=0;r!==i;){r=i;for(var c=0;c<e.length;c++){var s=c%e.length;e[s].data.status===a.Clear&&(n=k(e,s))}i=e.filter((function(e){return e.data.status===a.Clear})).length}return n},O=(n(14),function(e){return Object(l.jsxs)("div",{children:[e.gameState.win&&"Congratulations!",e.gameState.gameover&&"Better luck next time...",Object(l.jsx)("div",{className:"Button-container",children:e.gameState.win&&Object(l.jsx)("button",{className:"Button next",onClick:e.onClickNext,children:"Next game"})}),Object(l.jsx)("div",{className:"Button-container",children:e.gameState.gameover&&Object(l.jsx)("button",{className:"Button restart",onClick:e.onClickRestart,children:"Restart"})})]})}),w={size:0,cells:[],mines:0,score:0,highScore:0,win:!1,winStreak:0,gameover:!1};var C=function(){var e=Object(r.useState)(w),t=Object(o.a)(e,2),n=t[0],i=t[1],c=function(e){i(e),localStorage.setItem("gameState",JSON.stringify(e))},s=Object(r.useCallback)((function(){var e=localStorage.getItem("gameState");c(e?JSON.parse(e):f(9,1))}),[]);return Object(r.useEffect)((function(){return s()}),[s]),Object(l.jsxs)("div",{className:"App",children:[Object(l.jsx)(h,{isWin:n.win,isGameover:n.gameover,score:n.score,winStreak:n.winStreak,highScore:n.highScore,mines:n.mines}),Object(l.jsx)("div",{className:"Board-container",children:Object(l.jsx)(g,{size:n.size,cells:n.cells,onClick:function(e){c(function(e,t){if(e.win||e.gameover)return e;var n=Object.assign({},e);return n.cells.forEach((function(r){r.index===t&&r.data.status!==a.Flagged&&(r.data.mine?(r.data.status=a.Exploded,n.gameover=!0):r.data.status===a.Unknown&&(r=j(r,e.cells,t),n.score+=100,r.data.status===a.Clear&&(n.cells=S(e.cells,t))))})),v(n)&&(n.win=!0,n.winStreak++,n.score>n.highScore&&(n.highScore=n.score)),n}(n,e))},onRightClick:function(e){c(function(e,t){if(e.win||e.gameover)return e;var n=Object.assign({},e);return n.cells.forEach((function(e){e.index===t&&(e.data.status=e.data.status===a.Flagged?a.Unknown:a.Flagged)})),n}(n,e))}})}),Object(l.jsx)(O,{gameState:n,onClickNext:function(){var e=Math.pow(Math.sqrt(n.size)+1,2);e>400&&(e=400);var t=Math.round(1.5*n.mines);t>200&&(t=200);var a=f(e,t,n.score,n.highScore,n.winStreak);c(a)},onClickRestart:function(){var e=f(9,1,0,n.highScore,0);c(e)}})]})};s.a.render(Object(l.jsx)(i.a.StrictMode,{children:Object(l.jsx)(C,{})}),document.getElementById("root"))}],[[15,1,2]]]);
//# sourceMappingURL=main.5617eab9.chunk.js.map