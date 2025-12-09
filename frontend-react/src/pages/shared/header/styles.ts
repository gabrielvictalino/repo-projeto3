const css = `
:root{ --header-height:72px }
.sr-header{ display:flex; align-items:center; justify-content:space-between; gap:16px; padding:12px 28px; background:linear-gradient(90deg,var(--sr-blue),#1170b8); color:white; box-shadow: 0 2px 8px rgba(16,24,40,0.06); border-bottom-left-radius:2px; border-bottom-right-radius:2px; height:var(--header-height) }

/* Hamburger button in header */
.sr-hamburger-header{
  background: rgba(255,255,255,0.1);
  border: none;
  border-radius: 2px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px 10px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  margin-right: 12px;
}
.sr-hamburger-header .line{
  width: 20px;
  height: 2px;
  background: white;
  border-radius: 1px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.sr-hamburger-header:hover{
  background: rgba(255,255,255,0.15);
}
.sr-hamburger-header:active{
  transform: scale(0.95);
}

.sr-header .brand{ display:flex; align-items:center; gap:14px }
.sr-header .brand .logo{ width:44px; height:44px; border-radius:2px; background:var(--sr-accent); display:inline-block; box-shadow:0 2px 8px rgba(0,0,0,0.08) }
.sr-header .title{ font-size:18px; font-weight:700 }
.sr-header .subtitle{ font-size:13px; opacity:0.9 }

/* Center section with search */
.sr-header .header-center{
  flex: 1;
  display: flex;
  justify-content: center;
  max-width: 500px;
  margin: 0 auto;
}

.search-container{
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-toggle{
  background: rgba(255,255,255,0.1);
  border: none;
  border-radius: 2px;
  color: white;
  font-size: 18px;
  cursor: pointer;
  padding: 8px 12px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-toggle:hover{
  background: rgba(255,255,255,0.15);
}

.search-input{
  padding: 8px 16px;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 2px;
  background: rgba(255,255,255,0.1);
  color: white;
  font-size: 14px;
  width: 300px;
  outline: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-input::placeholder{
  color: rgba(255,255,255,0.6);
}

.search-input:focus{
  background: rgba(255,255,255,0.15);
  border-color: rgba(255,255,255,0.4);
}

.sr-header .actions{ display:flex; gap:12px; align-items:center }
.sr-header .user{ background:rgba(255,255,255,0.12); padding:8px 12px; border-radius:999px; display:flex; align-items:center; gap:8px; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) }
.sr-header .user:hover{ background:rgba(255,255,255,0.16) }
.sr-header .user .avatar{ width:28px; height:28px; border-radius:50%; background:rgba(255,255,255,0.16); display:inline-block }
.sr-header .cta{ background:rgba(255,255,255,0.12); padding:8px 12px; border-radius:2px; border:1px solid rgba(255,255,255,0.06); cursor:pointer }
.sr-header .primary{ background:var(--sr-accent); color:var(--sr-blue); border:none; padding:10px 16px; border-radius:2px; cursor:pointer; font-weight:600; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) }
.sr-header .primary:hover{ transform: translateY(-1px); box-shadow: 0 4px 12px rgba(255,210,0,0.3) }

@media (max-width:920px){ 
  .sr-header{ padding:12px 16px } 
  .search-input{ width: 200px }
}

/* bell */
.sr-bell{ position:relative; background:transparent; border:none; color:inherit; font-size:20px; cursor:pointer; padding:6px; transition: all 0.2s ease }
.sr-bell:hover{ transform: scale(1.1) }
.sr-bell .badge{ position:absolute; top:-6px; right:-6px; background:var(--sr-accent); color:#123; font-weight:700; font-size:11px; padding:3px 7px; border-radius:12px; box-shadow:0 2px 6px rgba(0,0,0,0.1) }
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
