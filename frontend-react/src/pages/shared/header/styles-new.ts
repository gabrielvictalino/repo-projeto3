const css = `
:root{ 
  --header-height: 56px;
}

.sr-header{ 
  display: flex; 
  align-items: center; 
  justify-content: space-between; 
  gap: 16px; 
  padding: 11px 40px; 
  background: linear-gradient(120deg, var(--sr-blue) 0%, #0066b3 100%); 
  color: white; 
  box-shadow: 0 2px 8px rgba(0,75,141,0.15); 
  height: var(--header-height);
  border: none;
  outline: none;
  margin: 0;
}

.sr-header .brand{ 
  display: flex; 
  align-items: center; 
  gap: 12px;
  flex-shrink: 0;
  cursor: pointer;
}

.sr-header .brand .logo{ 
  width: 32px; 
  height: 32px; 
  border-radius: 4px; 
  background: var(--sr-accent); 
  display: inline-block; 
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.sr-header .title{ 
  font-size: 15px; 
  font-weight: 700;
  white-space: nowrap;
  letter-spacing: -0.2px;
}

.sr-header .subtitle{ 
  font-size: 11px; 
  opacity: 0.9;
  white-space: nowrap;
  font-weight: 500;
}

.header-nav{
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  justify-content: center;
  max-width: 700px;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
}

.header-nav .nav-item{
  background: transparent;
  color: rgba(255,255,255,0.9);
  padding: 6px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  height: 34px;
}

.header-nav .nav-item:hover{
  background: rgba(255,255,255,0.12);
  color: white;
}

.header-nav .nav-item.active{
  background: rgba(255,210,0,0.2);
  color: white;
  font-weight: 600;
}

.header-nav .nav-icon{
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.9);
  transition: all 0.2s ease;
}

.header-nav .nav-icon svg{
  width: 16px;
  height: 16px;
}

.header-nav .nav-item:hover .nav-icon,
.header-nav .nav-item.active .nav-icon{
  opacity: 1;
  transform: scale(1);
}

.sr-header .header-center{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-shrink: 0;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
}

.search-container{
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.search-toggle{
  background: rgba(255,255,255,0.1);
  border-radius: 50%;
  color: white;
  cursor: pointer;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.search-toggle:hover{
  background: rgba(255,255,255,0.15);
  transform: scale(1.05);
}

.search-input{
  padding: 6px 14px;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 17px;
  background: rgba(255,255,255,0.1);
  color: white;
  font-size: 13px;
  width: 250px;
  height: 34px;
  transition: all 0.2s ease;
}

.search-input::placeholder{
  color: rgba(255,255,255,0.6);
}

.search-input:focus{
  background: rgba(255,255,255,0.15);
  border-color: rgba(255,255,255,0.4);
}

.sr-header .actions{ 
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  border: none !important;
  outline: none !important;
  transform: translateY(-20px);
}

/* Base button style - EXACTLY like nav-item */
.sr-header .header-btn{
  background: rgba(255,255,255,0.1);
  border: none;
  outline: none;
  color: white;
  padding: 6px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  height: 34px;
  margin: 0;
  box-sizing: border-box;
  position: relative;
  top: -2px;
}

.sr-header .header-btn:hover{
  background: rgba(255,255,255,0.15);
}

/* Bell button - circular */
.sr-header .bell-btn,
.sr-header .logout-icon{
  padding: 0;
  width: 34px;
  border-radius: 50%;
  gap: 0;
  justify-content: center;
  position: relative;
}

.sr-header .bell-btn .badge{
  position: absolute;
  top: -2px;
  right: -2px;
  background: var(--sr-accent);
  color: #004b8d;
  font-weight: 700;
  font-size: 9px;
  padding: 2px 5px;
  border-radius: 8px;
  min-width: 16px;
  text-align: center;
  line-height: 1;
}

/* Profile button - extended like nav-item */
.sr-header .profile-info{
  padding: 3px 14px 3px 3px;
  gap: 9px;
  border-radius: 17px;
}

.sr-header .profile-info .user-avatar{
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
  background: rgba(255,255,255,0.2);
  flex-shrink: 0;
  border: none;
}

.sr-header .profile-info .user-text{
  font-weight: 600;
}

/* Login button - accent colored like active nav */
.sr-header .btn-login{
  background: var(--sr-accent);
  color: var(--sr-blue);
  font-weight: 600;
  border-radius: 17px;
}

.sr-header .btn-login:hover{
  background: #ffd900;
}

@media (max-width: 920px){ 
  .sr-header{ 
    padding: 12px 20px;
    gap: 12px;
  }
  
  .search-input{ 
    width: 180px;
  }
  
  .header-nav{
    gap: 4px;
  }
  
  .header-nav .nav-item{
    padding: 6px 12px;
    font-size: 12px;
  }
}
`;

export default function injectHeaderStyles(){
  const oldStyle = document.querySelector('style[data-styles="shared-header"]');
  if (oldStyle) {
    oldStyle.remove();
  }
  
  const el = document.createElement('style');
  el.setAttribute('data-styles','shared-header');
  el.innerHTML = css;
  document.head.appendChild(el);
}
