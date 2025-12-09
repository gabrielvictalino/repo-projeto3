const css = `
/* Menu base styles */
.sr-menu{
  background: linear-gradient(180deg,var(--sr-blue),#006bb3);
  color: white;
  padding: 18px 14px;
  display:flex;
  flex-direction:column;
  box-shadow: 2px 0 8px rgba(2,6,23,0.06);
  height: calc(100vh - var(--header-height) - var(--footer-height));
  overflow-y: auto;
  align-self: stretch;
  position: relative;
  border-top-right-radius:2px;
  transition: width 500ms cubic-bezier(0.4, 0, 0.2, 1), padding 500ms cubic-bezier(0.4, 0, 0.2, 1), opacity 400ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* 3-state menu widths */
.sr-menu.expanded{ 
  width: 260px; 
  flex: 0 0 260px; 
  opacity: 1;
}
.sr-menu.collapsed{ 
  width: 72px; 
  padding: 12px 8px; 
  flex: 0 0 72px; 
  opacity: 1;
}

/* Brand section */
.sr-top{ display:flex; align-items:center; justify-content:space-between; gap:8px }
.sr-brand{ display:flex; align-items:center; gap:10px; font-weight:700; font-size:18px }
.sr-brand .logo{ width:34px; height:34px; border-radius:2px; background:var(--sr-accent); flex-shrink: 0 }
.sr-brand .brand-text{ 
  white-space:nowrap; 
  display:inline-block; 
  overflow:hidden; 
  transition: opacity 350ms cubic-bezier(0.4, 0, 0.2, 1), max-width 500ms cubic-bezier(0.4, 0, 0.2, 1); 
  opacity:1;
  max-width: 160px;
}
.sr-menu.collapsed .brand-text{ 
  opacity:0; 
  max-width:0; 
  margin:0; 
  pointer-events:none;
}

/* Navigation */
.sr-nav{ display:flex; flex-direction:column; gap:6px; margin-top:18px }
.sr-nav .nav-item{ 
  display:flex; 
  align-items:center; 
  gap:10px; 
  background:transparent; 
  border:none; 
  color:inherit; 
  padding:10px 8px; 
  border-radius:2px; 
  text-align:left; 
  cursor:pointer; 
  transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1), transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
}
.sr-nav .nav-item .icon{ 
  width:28px; 
  text-align:center; 
  font-size:18px; 
  flex-shrink: 0;
}
.sr-nav .nav-item .label{ 
  white-space:nowrap; 
  display:inline-block; 
  overflow:hidden; 
  transition: opacity 350ms cubic-bezier(0.4, 0, 0.2, 1), max-width 500ms cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 1;
  max-width: 180px;
}
.sr-menu.collapsed .sr-nav .nav-item .label{ 
  opacity:0; 
  max-width:0;
  pointer-events: none;
}
.sr-nav .nav-item:hover{ 
  background: rgba(255,255,255,0.08); 
  transform: translateX(4px);
}
.sr-nav .nav-item.active{ 
  background: var(--sr-accent); 
  color:var(--sr-blue); 
  font-weight:600;
}

/* Footer */
.sr-footer{ 
  margin-top:auto; 
  font-size:12px; 
  opacity:0.9; 
  padding-top: 12px;
  transition: opacity 350ms cubic-bezier(0.4, 0, 0.2, 1);
}
.sr-menu.collapsed .sr-footer{
  opacity: 0;
  pointer-events: none;
}

/* Custom scrollbar (WebKit) */
.sr-menu::-webkit-scrollbar{ width:8px }
.sr-menu::-webkit-scrollbar-track{ background: transparent }
.sr-menu::-webkit-scrollbar-thumb{ 
  background: rgba(255,210,0,0.4); 
  border-radius:8px; 
}
.sr-menu::-webkit-scrollbar-thumb:hover{ 
  background: rgba(255,210,0,0.6); 
}

/* Firefox scrollbar */
.sr-menu{ scrollbar-width: thin; scrollbar-color: rgba(255,210,0,0.4) transparent }
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
