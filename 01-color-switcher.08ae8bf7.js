!function(){var t=document.querySelector("button[data-start]"),a=document.querySelector("button[data-stop]"),n=null,o=!1;function e(){var t="rgb(".concat(Math.floor(255*Math.random()),", ").concat(Math.floor(255*Math.random()),", ").concat(Math.floor(255*Math.random()),")");document.body.style.background="".concat(t),console.log(t)}t.disabled=!1,a.disabled=!0,t.addEventListener("click",(function(d){if(o)return;e(),n=setInterval(e,1e3),o=!0,t.disabled=!0,a.disabled=!1})),a.addEventListener("click",(function(e){clearInterval(n),o=!1,t.disabled=!1,a.disabled=!0}))}();
//# sourceMappingURL=01-color-switcher.08ae8bf7.js.map