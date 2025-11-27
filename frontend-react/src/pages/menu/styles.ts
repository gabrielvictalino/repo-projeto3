const css = `
.sr-menu{
  width: 240px;
  background: linear-gradient(180deg,var(--sr-blue),#006bb3);
  color: white;
  padding: 18px 14px;
  display:flex;
  flex-direction:column;
  box-shadow: 4px 12px 36px rgba(2,6,23,0.12);
  /* size the menu to fit between header and footer explicitly */
  height: calc(100vh - var(--header-height) - var(--footer-height));
  overflow-y: auto;
  flex: 0 0 240px; /* prevent flexbox from shrinking the sidebar */
  align-self: stretch; /* ensure full height between header and footer */
  position: relative; /* for positioning the toggle */
  border-top-right-radius:12px;
}
.sr-menu .sr-brand{ font-weight:700; font-size:18px; margin-bottom:18px }
.sr-menu nav{ display:flex; flex-direction:column; gap:8px }
.sr-menu button{ background: transparent; border: none; color:inherit; text-align:left; padding:10px 12px; border-radius:6px; cursor:pointer; font-size:14px }
.sr-menu button:hover{ background: rgba(255,255,255,0.06) }
.sr-menu button.active{ background: var(--sr-accent); color:var(--sr-blue); font-weight:600 }
.sr-menu .sr-footer{ margin-top:auto; font-size:12px; opacity:0.9 }

/* collapsed/expanded behavior */
.sr-menu{ transition: width 280ms cubic-bezier(.2,.9,.2,1), background 220ms ease }
.sr-menu.collapsed{ width:72px; padding:12px 8px; flex: 0 0 72px }
.sr-menu .brand-text, .sr-menu .label{ display:inline-block; max-width:160px; overflow:hidden; vertical-align:middle; transition: opacity 200ms ease, max-width 260ms cubic-bezier(.2,.9,.2,1); opacity:1 }
.sr-menu.collapsed .brand-text, .sr-menu.collapsed .label{ opacity:0; max-width:0; margin:0; pointer-events:none }

.sr-top{ display:flex; align-items:center; justify-content:space-between; gap:8px }
.sr-brand{ display:flex; align-items:center; gap:10px }
.sr-brand .logo{ width:34px; height:34px; border-radius:6px; background:var(--sr-accent) }
.sr-toggle{ background:transparent; border:none; color:inherit; cursor:pointer; padding:6px; font-size:14px }
/* larger, fixed toggle at bottom for easier clicking */
.sr-toggle{ position: absolute; bottom: 14px; left: 50%; transform: translateX(-50%); background: rgba(255,255,255,0.06); border:none; color:inherit; padding:8px 10px; border-radius:8px; cursor:pointer }

.sr-toggle:active{ transform: translateX(-50%) scale(0.98) }

.sr-nav{ display:flex; flex-direction:column; gap:6px; margin-top:12px }
.sr-nav .nav-item{ display:flex; align-items:center; gap:10px; background:transparent; border:none; color:inherit; padding:10px 8px; border-radius:8px; text-align:left; cursor:pointer; transition: background 180ms ease, transform 180ms ease }
.sr-nav .nav-item .icon{ width:28px; text-align:center; font-size:18px }
.sr-nav .nav-item .label{ white-space:nowrap; display:inline-block; max-width:200px; overflow:hidden; vertical-align:middle; transition: opacity 180ms ease, max-width 220ms cubic-bezier(.2,.9,.2,1) }
.sr-menu.collapsed .sr-nav .nav-item .label{ opacity:0; max-width:0 }
.sr-nav .nav-item:hover{ background: rgba(255,255,255,0.06); transform: translateX(6px) }
.sr-nav .nav-item.active{ background: var(--sr-accent); color:var(--sr-blue); font-weight:600 }

/* custom scrollbar (WebKit) */
.sr-menu::-webkit-scrollbar{ width:10px }
.sr-menu::-webkit-scrollbar-track{ background: transparent }
.sr-menu::-webkit-scrollbar-thumb{ background: var(--sr-accent); border-radius:8px; border:2px solid rgba(0,0,0,0.06) }

/* firefox scrollbar */
.sr-menu{ scrollbar-width: thin; scrollbar-color: var(--sr-accent) transparent }
`;

let injected = false;
export default function injectMenuStyles(){
  if (injected) return;
  injected = true;
  const el = document.createElement('style');
  el.setAttribute('data-styles','menu');
  el.innerHTML = css;
  document.head.appendChild(el);
}
