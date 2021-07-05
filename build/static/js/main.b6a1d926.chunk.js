(this["webpackJsonppart2-notes"]=this["webpackJsonppart2-notes"]||[]).push([[0],{39:function(t,e,n){},40:function(t,e,n){"use strict";n.r(e);var c=n(0),r=n(15),o=n.n(r),a=n(6),i=n(3),u=n(2),s=n(4),j=n.n(s),l="/api/notes",f={getAll:function(){var t=j.a.get("".concat(l)),e={id:1e4,content:"This note is not saved to server",date:"2019-05-30T17:30:31.098Z",important:!0};return t.then((function(t){return t.data.concat(e)}))},create:function(t){return j.a.post(l,t).then((function(t){return t.data}))},update:function(t,e){return j.a.put("".concat(l,"/").concat(t),e).then((function(t){return t.data}))}},b=function(t){var e=t.note,n=t.important,r=t.toggleImportance,o=n?"make not important":"make important";return Object(c.jsxs)("li",{className:"note",children:[e,Object(c.jsx)("button",{type:"button",onClick:r,children:o})]})},p=function(t){var e=t.message;return null===e?null:Object(c.jsx)("div",{className:"error",children:e})},d=function(){return Object(c.jsxs)("div",{style:{color:"green",fontStyle:"italic",fontSize:16},children:[Object(c.jsx)("br",{}),Object(c.jsx)("em",{children:"Note app, Department of Computer Science, University of Helsinki 2021"})]})},m=function(){var t=Object(u.useState)([]),e=Object(i.a)(t,2),n=e[0],r=e[1],o=Object(u.useState)(""),s=Object(i.a)(o,2),j=s[0],l=s[1],m=Object(u.useState)(!1),O=Object(i.a)(m,2),h=O[0],v=O[1],x=Object(u.useState)(null),g=Object(i.a)(x,2),S=g[0],y=g[1];Object(u.useEffect)((function(){f.getAll().then((function(t){r(t)}))}),[]);var k=h?n:n.filter((function(t){return t.important}));return Object(c.jsxs)("div",{children:[Object(c.jsx)("h1",{children:"Notes App"}),Object(c.jsx)(p,{message:S}),Object(c.jsx)("div",{children:Object(c.jsxs)("button",{onClick:function(){return v(!h)},type:"button",children:[" ","show ",h?"important":"all"]})}),Object(c.jsx)("ul",{children:k.map((function(t){var e=t.id,o=t.content,i=t.important;return Object(c.jsx)(b,{note:o,important:i,toggleImportance:function(){return function(t){var e=n.find((function(e){return e.id===t})),c=Object(a.a)(Object(a.a)({},e),{},{important:!e.important});f.update(t,c).then((function(e){r(n.map((function(n){return n.id!==t?n:e})))})).catch((function(c){y("The note '".concat(e.content,"' was already deleted from server")),setTimeout((function(){y(null)}),5e3),r(n.filter((function(e){return e.id!==t})))}))}(e)}},e)}))}),Object(c.jsxs)("form",{onSubmit:function(t){t.preventDefault();var e={content:j,date:(new Date).toISOString(),important:Math.random()<.5};f.create(e).then((function(t){r(n.concat(t)),l("")}))},children:[Object(c.jsx)("input",{type:"text",value:j,required:!0,onChange:function(t){l(t.target.value)}}),Object(c.jsx)("button",{type:"submit",children:"save"})]}),Object(c.jsx)(d,{})]})};n(39);o.a.render(Object(c.jsx)(m,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.b6a1d926.chunk.js.map