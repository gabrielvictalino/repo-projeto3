const css = `
:root{ --footer-height:72px }
.sr-footer{ padding:18px 24px; background:linear-gradient(90deg,#f7f7f7,#eef6ff); color:#234; margin-top:28px; height:var(--footer-height); box-sizing:border-box }
.sr-footer .inner{ max-width:1100px; margin:0 auto; display:flex; justify-content:space-between; align-items:center; gap:12px }
.sr-footer .links{ display:flex; gap:12px; font-size:13px; color:#446 }
@media (max-width:720px){ .sr-footer .inner{ flex-direction:column; align-items:flex-start } }
`;

let injected = false;
export default function injectFooterStyles(){
  if (injected) return;
  injected = true;
  const el = document.createElement('style');
  el.setAttribute('data-styles','shared-footer');
  el.innerHTML = css;
  document.head.appendChild(el);
}
