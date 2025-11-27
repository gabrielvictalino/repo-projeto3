const css = `
:root{ --header-height:72px }
.sr-header{ display:flex; align-items:center; justify-content:space-between; gap:16px; padding:12px 28px; background:linear-gradient(90deg,var(--sr-blue),#1170b8); color:white; box-shadow: 0 6px 20px rgba(16,24,40,0.08); border-bottom-left-radius:10px; border-bottom-right-radius:10px; height:var(--header-height) }
.sr-header .brand{ display:flex; align-items:center; gap:14px }
.sr-header .brand .logo{ width:44px; height:44px; border-radius:10px; background:var(--sr-accent); display:inline-block; box-shadow:0 6px 18px rgba(0,0,0,0.12) }
.sr-header .title{ font-size:18px; font-weight:700 }
.sr-header .subtitle{ font-size:13px; opacity:0.9 }
.sr-header .actions{ display:flex; gap:12px; align-items:center }
.sr-header .user{ background:rgba(255,255,255,0.12); padding:8px 12px; border-radius:999px; display:flex; align-items:center; gap:8px }
.sr-header .user .avatar{ width:28px; height:28px; border-radius:50%; background:rgba(255,255,255,0.16); display:inline-block }
.sr-header .cta{ background:rgba(255,255,255,0.12); padding:8px 12px; border-radius:8px; border:1px solid rgba(255,255,255,0.06); cursor:pointer }
@media (max-width:920px){ .sr-header{ padding:12px 16px } }

/* bell */
.sr-bell{ position:relative; background:transparent; border:none; color:inherit; font-size:20px; cursor:pointer; padding:6px }
.sr-bell .badge{ position:absolute; top:-6px; right:-6px; background:var(--sr-accent); color:#123; font-weight:700; font-size:11px; padding:3px 7px; border-radius:12px; box-shadow:0 3px 8px rgba(0,0,0,0.12) }
`;

let injected = false;
export default function injectHeaderStyles(){
  if (injected) return;
  injected = true;
  const el = document.createElement('style');
  el.setAttribute('data-styles','shared-header');
  el.innerHTML = css;
  document.head.appendChild(el);
}
