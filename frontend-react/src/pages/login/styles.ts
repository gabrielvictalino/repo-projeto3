const css = `
:root{
  --sr-blue: #004b8d;
  --sr-accent: #ffd200;
  --sr-bg: #f6f9fc;
  --sr-surface: #ffffff;
}
/* full-screen split background */
.logon-split{ min-height: calc(100vh - var(--header-height, 0px) - var(--footer-height, 0px)); position:relative }
.logon-top{ height:50vh; background: linear-gradient(180deg,var(--sr-blue),#1170b8); display:block }
.logon-bottom{ height:50vh; background: white }

/* rectangle (card) positioned centered on the split (straddles blue and white) */
.logon-wrapper{ position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:100%; display:flex; justify-content:center; z-index:5 }
.logon-card{ width:100%; max-width:640px; background:var(--sr-surface); padding:22px; border-radius:10px; box-shadow:0 18px 40px rgba(3,10,30,0.18) }
.logon-card h2{ color:var(--sr-blue); margin:0 0 8px 0; text-align:center }
.logon-card .field{ margin-top:10px }
.logon-card .field label{ display:block; margin-bottom:6px; font-size:13px }
.logon-card .field input{ width:100%; padding:10px; border-radius:8px; border:1px solid #e6eef8 }
.logon-card .actions{ margin-top:14px; display:flex; justify-content:center }
.primary{ background:var(--sr-blue); color:white; border:none; padding:10px 16px; border-radius:8px; cursor:pointer }

/* social dots aesthetics */
.social-row{ margin-top:18px; display:flex; justify-content:center; gap:14px }
.social-dot{ width:44px; height:44px; border-radius:50%; background:rgba(255,255,255,0.12); display:flex; align-items:center; justify-content:center; box-shadow:0 6px 18px rgba(2,6,23,0.08) }
.social-dot.small{ width:34px; height:34px }
.social-dot span{ font-size:14px; color:white; opacity:0.95 }

/* loading overlay */
.logon-loading{ position:fixed; inset:0; display:flex; align-items:center; justify-content:center; background:linear-gradient(180deg,var(--sr-blue),#0b4f87); color:white; z-index:9999 }
.spinner{ width:48px; height:48px; border-radius:50%; border:4px solid rgba(255,255,255,0.18); border-top-color:white; animation:spin 1s linear infinite }
@keyframes spin{ to { transform:rotate(360deg) } }

@media (max-width:720px){ .logon-card{ margin: 0 12px; transform:none } .logon-bottom{ height:30vh } }
`;

let injected = false;
export default function injectLogonStyles(){
  if (injected) return;
  injected = true;
  const el = document.createElement('style');
  el.setAttribute('data-styles','logon');
  el.innerHTML = css;
  document.head.appendChild(el);
}
