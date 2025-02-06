import{W as c,r as d,j as e,Y as x,b as h}from"./app-Cb62PE2H.js";import{C as p,a as f}from"./card-CZUvnfSP.js";import{B as u}from"./button-BmJIn_d_.js";import{c as o}from"./createLucideIcon-CAGrl7JE.js";import"./utils-CAeF3P2J.js";/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=o("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=o("Send",[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]]),v=({tableId:m})=>{const{post:y,data:a,setData:t}=c({message:"",receiver_id:""}),[r,n]=d.useState(!1),l=s=>{s.preventDefault(),n(!0),h.post(route("web.chat.sendMessage",m),a).then(()=>{t("message","")}).finally(()=>{n(!1)})},i=s=>{s.key==="Enter"&&(s.ctrlKey||s.metaKey)&&(s.preventDefault(),l(s))};return e.jsxs(e.Fragment,{children:[e.jsx(x,{title:"Chat"}),e.jsx(p,{children:e.jsx("div",{className:"flex items-center justify-center min-h-screen",children:e.jsxs(f,{className:"w-full max-w-lg p-6 shadow-lg",children:[e.jsx("h2",{className:"mb-4 text-xl font-semibold text-center",children:"Simple Chat"}),e.jsxs("form",{className:"flex flex-col gap-2",onSubmit:l,children:[e.jsx("textarea",{className:"flex-1 p-2 border rounded-md resize-none",placeholder:"Type your message...",value:a.message,onChange:s=>t("message",s.target.value),onKeyDown:i,rows:3}),e.jsxs(u,{type:"submit",className:"mt-2",disabled:r,title:"Press Ctrl+Enter (Windows) or ⌘+Enter (Mac) to send",children:[r?e.jsx(g,{className:"w-4 h-4 mr-1 animate-spin"}):e.jsx(j,{className:"w-4 h-4 mr-1"}),"Send"]})]})]})})})]})};export{v as default};
