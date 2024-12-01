import{_,o as i,c as u,r as f,a as t,m as L,v as B,n as F,f as y,d as T,p as x,t as b,b as h,w as z,F as $,q as k,s as C,u as I}from"./CLLyX2gY.js";import{_ as S}from"./Ch9cPKs0.js";const N={},j={class:"selected-meals",id:"selectedMealsContainer"};function V(o,c){return i(),u("div",j)}const A=_(N,[["render",V]]),D={class:"search-form-wrapper"},H={class:"search-input-wrapper"},U=["disabled"],q={__name:"search-bar",props:{meals:{type:Array,required:!0}},emits:["updateMeals"],setup(o,{emit:c}){const s=o,r=f(""),a=c;let m=null;const l=()=>{clearTimeout(m),m=setTimeout(()=>{const g=s.meals.filter(d=>{var n,e;const w=r.value.toLowerCase();return((n=d==null?void 0:d.name)==null?void 0:n.toLowerCase().includes(w))||((e=d==null?void 0:d.description)==null?void 0:e.toLowerCase().includes(w))});a("updateMeals",[...g])},300)},p=()=>{r.value="",a("updateMeals",s.meals)};return(g,d)=>(i(),u("div",D,[t("form",{onSubmit:F(l,["prevent"])},[t("div",H,[L(t("input",{type:"text",id:"search-input",class:"search-input","onUpdate:modelValue":d[0]||(d[0]=w=>r.value=w),placeholder:"Zoek een gerecht",autofocus:"",onInput:l},null,544),[[B,r.value]]),t("button",{type:"button",class:"button primary no-animate clear-button",onClick:p,disabled:!r.value}," × ",8,U)])],32)]))}},O=_(q,[["__scopeId","data-v-a70f1b8e"]]),R="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3csvg%20version='1.1'%20id='Capa_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%20800%20562.2'%20style='enable-background:new%200%200%20800%20562.2;'%20xml:space='preserve'%3e%3cpath%20d='M693.5,314c-12.2-12.2-32-12.2-44.3,0c-12.2,12.2-12.2,32,0,44.3l43.9,43.9h-29.2c-28.4,0-56.2-10-78.1-28.1l-112.5-93%20l112.5-93c21.9-18.1,49.6-28.1,78.1-28.1h29.2l-43.9,43.9c-12.2,12.2-12.2,32,0,44.3c6.1,6.1,14.1,9.2,22.1,9.2s16-3.1,22.1-9.2%20l97.4-97.4c12.2-12.2,12.2-32,0-44.3L693.5,9.2c-12.2-12.2-32-12.2-44.3,0c-12.2,12.2-12.2,32,0,44.3l43.9,43.9h-29.2%20c-43,0-84.9,15.1-118,42.5L424.2,240.5L287.1,127.1c-23.2-19.2-52.5-29.7-82.5-29.7H31.3C14,97.4,0,111.4,0,128.7S14,160,31.3,160%20h173.3c15.5,0,30.6,5.4,42.6,15.3l127.9,105.8L247.2,386.9c-12,9.9-27.1,15.3-42.6,15.3H31.3C14,402.2,0,416.2,0,433.5%20c0,17.3,14,31.3,31.3,31.3h173.3c30,0,59.3-10.5,82.5-29.7l137.1-113.4l121.7,100.6c33.1,27.4,75,42.5,118,42.5h29.2l-43.9,43.9%20c-12.2,12.2-12.2,32,0,44.3c6.1,6.1,14.1,9.2,22.1,9.2c8,0,16-3.1,22.1-9.2l97.4-97.4c12.2-12.2,12.2-32,0-44.3L693.5,314z'%20fill='%23FFFFFF'/%3e%3c/svg%3e",E={class:"button-bar"},G={class:"filter-toggles",style:{display:"none"}},Q={class:"overview-totals",id:"overviewTotals"},W={id:"totalResults"},Z={__name:"filter-bar",props:{meals:Array},emits:["updateMeals"],setup(o,{emit:c}){const s=o,r=c,a=f([]),m=f(0),l=()=>{m.value=s.meals.filter(n=>a.value.every(e=>n.categoryLabels.includes(e))).length};y(()=>s.meals,l,{immediate:!0});const p=n=>{let e=n.length,v,M;for(;e!==0;)v=Math.floor(Math.random()*e),e-=1,M=n[e],n[e]=n[v],n[v]=M;return n},g=()=>{a.value=[],l();const n=p([...s.meals]);r("updateMeals",n)},d=n=>{a.value.includes(n)?a.value=a.value.filter(e=>e!==n):a.value.push(n),l()},w=()=>{s.meals.sort((n,e)=>new Date(e.createdAt)-new Date(n.createdAt)),l()};return(n,e)=>(i(),u("div",E,[t("button",{id:"refreshButton",class:"primary overview-refresh-button",onClick:g},e[4]||(e[4]=[T(" Shuffle "),t("span",{class:"icon"},[t("img",{src:R,alt:""})],-1)])),t("div",G,[e[5]||(e[5]=t("span",{class:"label"},"Laat zien:",-1)),t("button",{class:x(["secondary",{active:a.value.includes("betaalbaar")}]),onClick:e[0]||(e[0]=v=>d("betaalbaar"))}," Betaalbaar ",2),t("button",{class:x(["secondary",{active:a.value.includes("gezond")}]),onClick:e[1]||(e[1]=v=>d("gezond"))}," Gezond ",2),t("button",{class:x(["secondary",{active:a.value.includes("snel")}]),onClick:e[2]||(e[2]=v=>d("snel"))}," Snel ",2),t("button",{class:x(["secondary",{active:a.value.includes("verwennerij")}]),onClick:e[3]||(e[3]=v=>d("verwennerij"))}," Verwennerij ",2)]),t("button",{id:"sortByNew",style:{display:"none"},onClick:w}," Nieuwste "),t("div",Q,[t("span",W,b(m.value)+" gerechten",1)])]))}},J=_(Z,[["__scopeId","data-v-b4e224fc"]]),K={},P={id:"messageContainer"};function X(o,c){return i(),u("div",P)}const Y=_(K,[["render",X]]),ee={class:"meal-item__wrapper"},te={class:"meal-image-wrapper"},se=["src","alt"],ae={class:"category-labels"},ne=["innerHTML"],le={class:"meal-info-wrapper"},oe={class:"short-description"},ce={__name:"meal-item",props:{meal:Object},setup(o){return(c,s)=>{const r=S;return i(),u("div",ee,[h(r,{to:`/meals/${o.meal.name.replace(/\s+/g,"-").replace(/[^a-z0-9-_]/gi,"").toLowerCase()}`},{default:z(()=>[t("div",te,[t("img",{src:"meal-images/medium/"+o.meal.name.replace(/\s+/g,"_").replace(/[^a-z0-9_]/gi,"").toLowerCase()+".webp",alt:"Gerecht "+o.meal.name,loading:"lazy"},null,8,se),t("ul",ae,[(i(!0),u($,null,k(o.meal.categoryLabels,a=>(i(),u("li",{key:a,innerHTML:a},null,8,ne))),128))])]),t("div",le,[t("h2",null,b(o.meal.name),1),t("div",oe,b(o.meal.description),1)])]),_:1},8,["to"])])}}},re=_(ce,[["__scopeId","data-v-20ce2828"]]),ie="data:image/svg+xml,%3csvg%20version='1.1'%20id='loader-1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20width='60px'%20height='60px'%20viewBox='0%200%2050%2050'%20style='enable-background:new%200%200%2050%2050;'%20xml:space='preserve'%3e%3cpath%20fill='%236bac6b'%20d='M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z'%3e%3canimateTransform%20attributeType='xml'%20attributeName='transform'%20type='rotate'%20from='0%2025%2025'%20to='360%2025%2025'%20dur='0.6s'%20repeatCount='indefinite'/%3e%3c/path%3e%3c/svg%3e",de={},ue={id:"loader",class:"loader-wrapper"};function me(o,c){return i(),u("div",ue,c[0]||(c[0]=[t("div",{class:"loader-image"},[t("img",{src:ie})],-1)]))}const pe=_(de,[["render",me],["__scopeId","data-v-9c66084c"]]),_e={id:"dataContainer"},ve={key:0},he={key:1,class:"meals-container"},fe={__name:"meal-overview",props:{meals:{type:Array,required:!0}},setup(o){const c=o,s=f(c.meals),r=f(!1),a=m=>{r.value=!0,s.value=[],setTimeout(()=>{s.value=m,r.value=!1},200)};return y(()=>c.meals,m=>{a(m)}),(m,l)=>(i(),u("div",_e,[r.value?(i(),u("div",ve,[h(pe)])):(i(),u("div",he,[(i(!0),u($,null,k(s.value,p=>(i(),C(re,{key:p.id,meal:p},null,8,["meal"]))),128))]))]))}},we=_(fe,[["__scopeId","data-v-68397c31"]]),ge={__name:"overview",setup(o){const c=f([]),s=f([]),r=async()=>{try{const p=await(await fetch("https://jsonhost.com/json/5f19df4daab1bba7c467369dd44f8d8d")).json();c.value=p||[],s.value=[...c.value]}catch(l){console.error("Error getting meals:",l)}},a=l=>{s.value=l},m=l=>{s.value=l};return y(s,l=>{console.log("Filtered Meals:",l)}),I(()=>{r()}),(l,p)=>(i(),u("div",null,[h(A),h(O,{meals:c.value,onUpdateMeals:a},null,8,["meals"]),h(J,{meals:s.value,onUpdateMeals:m},null,8,["meals"]),h(Y),h(we,{meals:s.value},null,8,["meals"])]))}},xe={};function be(o,c){const s=ge;return i(),C(s)}const $e=_(xe,[["render",be]]);export{$e as default};
