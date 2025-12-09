const css = `
:root{ --footer-height:72px }
.sr-footer{ 
  padding:18px 24px; 
  background: var(--sr-surface);
  color: var(--sr-text-secondary);
  border-top: 1px solid var(--sr-border);
  margin-top:28px; 
  height:var(--footer-height); 
  box-sizing:border-box;
  transition: all 0.3s ease;
}
.sr-footer .inner{ 
  max-width:1100px; 
  margin:0 auto; 
  display:flex; 
  justify-content:space-between; 
  align-items:center; 
  gap:12px 
}
.sr-footer .links{ 
  display:flex; 
  gap:12px; 
  font-size:13px; 
  color: var(--sr-text-secondary);
}
.sr-footer .links a{
  color: var(--sr-text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;
}
.sr-footer .links a:hover{
  color: var(--sr-blue);
}
@media (max-width:720px){ 
  .sr-footer .inner{ 
    flex-direction:column; 
    align-items:flex-start 
  } 
}
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
