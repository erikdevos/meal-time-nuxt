import{_ as h}from"./D-w0CGxP.js";import{u as y,p as g,q as w,_ as x,r as k,s as z,c as m,a as n,t as d,b,w as M,F as N,v as R,o as p}from"./gsm-rEJc.js";const S="$s";function $(...s){const a=typeof s[s.length-1]=="string"?s.pop():void 0;typeof s[0]!="string"&&s.unshift(a);const[l,o]=s;if(!l||typeof l!="string")throw new TypeError("[nuxt] [useState] key must be a string: "+l);if(o!==void 0&&typeof o!="function")throw new Error("[nuxt] [useState] init must be a function: "+o);const r=S+l,i=y(),e=g(i.payload.state,r);if(e.value===void 0&&o){const t=o();if(w(t))return i.payload.state[r]=t,t;e.value=t}return e}const C={key:0},E={class:"meal-details-wrapper"},F={class:"meal-details-text"},L={class:"meal-details-image"},q=["src","alt"],B={key:1},K={__name:"[mealname]",setup(s){const a=k(null),l=R(),o=$(()=>({}),"$hqulWK3qUz"),r=e=>e.toLowerCase().replace(/[\s\-]+/g,"_").replace(/[^a-z0-9_]/gi,""),i=async e=>{try{if(o.value[e]){a.value=o.value[e];return}const c=await(await fetch("https://erikdevos.github.io/meal-time-data/meals.json")).json();console.log("Fetched data:",c),console.log("Meal name to search for:",e);const _=r(e),u=c.find(v=>{const f=r(v.name);return console.log(`Comparing normalized names: ${f} === ${_}`),f===_})||null;a.value=u,u?o.value[e]=u:console.warn(`No meal found with name: ${e}`)}catch(t){console.error("Error fetching meal detail:",t)}};return z(()=>{const e=l.params.mealname;console.log("Route param mealname:",e),e?i(e):console.warn("No meal name in URL")}),(e,t)=>{const c=h;return p(),m(N,null,[a.value?(p(),m("div",C,[n("div",E,[n("div",F,[n("h1",null,d(a.value.name),1),n("h2",null,d(a.value.description),1),n("p",null,d(a.value.recipe),1)]),n("div",L,[n("img",{src:"/meal-images/medium/"+a.value.name.replace(/\s+/g,"_").replace(/[^a-z0-9_]/gi,"").toLowerCase()+".webp",alt:"Gerecht "+a.value.name,loading:"lazy"},null,8,q)])])])):(p(),m("div",B,t[0]||(t[0]=[n("p",null,"Meal not found",-1)]))),b(c,{to:"/overview"},{default:M(()=>t[1]||(t[1]=[n("button",{class:"button primary"}," ‹ Terug naar overzicht ",-1)])),_:1})],64)}}},j=x(K,[["__scopeId","data-v-7bc25f5d"]]);export{j as default};
