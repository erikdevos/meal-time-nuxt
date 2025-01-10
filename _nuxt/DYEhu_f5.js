import{_ as h}from"./DxxiqAdk.js";import{u as y,p as g,q as w,_ as x,r as k,s as z,c as m,a as o,t as d,b as M,w as b,F as N,v as R,o as p}from"./Dc1e3aC9.js";const S="$s";function $(...s){const a=typeof s[s.length-1]=="string"?s.pop():void 0;typeof s[0]!="string"&&s.unshift(a);const[l,n]=s;if(!l||typeof l!="string")throw new TypeError("[nuxt] [useState] key must be a string: "+l);if(n!==void 0&&typeof n!="function")throw new Error("[nuxt] [useState] init must be a function: "+n);const r=S+l,i=y(),e=g(i.payload.state,r);if(e.value===void 0&&n){const t=n();if(w(t))return i.payload.state[r]=t,t;e.value=t}return e}const C={key:0},E={class:"meal-details-wrapper"},F={class:"meal-details-text"},L={class:"meal-details-image"},q=["src","alt"],B={key:1},K={__name:"[mealname]",setup(s){const a=k(null),l=R(),n=$(()=>({}),"$hqulWK3qUz"),r=e=>e.toLowerCase().replace(/[\s\-]+/g,"_").replace(/[^a-z0-9_]/gi,""),i=async e=>{try{if(n.value[e]){a.value=n.value[e];return}const c=await(await fetch("https://erikdevos.github.io/meal-time-data/meals.json")).json();console.log("Fetched data:",c),console.log("Meal name to search for:",e);const f=r(e),u=c.find(v=>{const _=r(v.name);return console.log(`Comparing normalized names: ${_} === ${f}`),_===f})||null;a.value=u,u?n.value[e]=u:console.warn(`No meal found with name: ${e}`)}catch(t){console.error("Error fetching meal detail:",t)}};return z(()=>{const e=l.params.mealname;console.log("Route param mealname:",e),e?i(e):console.warn("No meal name in URL")}),(e,t)=>{const c=h;return p(),m(N,null,[a.value?(p(),m("div",C,[o("div",E,[o("div",F,[o("h1",null,d(a.value.name),1),o("h2",null,d(a.value.description),1),o("p",null,d(a.value.recipe),1)]),o("div",L,[o("img",{src:"../meal-images/medium/"+a.value.name.replace(/\s+/g,"_").replace(/[^a-z0-9_]/gi,"").toLowerCase()+".webp",alt:"Gerecht "+a.value.name,loading:"lazy"},null,8,q)])])])):(p(),m("div",B,t[0]||(t[0]=[o("p",null,"Meal not found",-1)]))),M(c,{to:"/overview"},{default:b(()=>t[1]||(t[1]=[o("button",{class:"button primary"}," ‹ Terug naar overzicht ",-1)])),_:1})],64)}}},j=x(K,[["__scopeId","data-v-ce3af143"]]);export{j as default};
