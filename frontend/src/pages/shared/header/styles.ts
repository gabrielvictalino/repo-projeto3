const css = `
:root{ 
  --header-height: 56px;
}

/* Reset for header */
.sr-header, 
.sr-header *, 
.sr-header *::before, 
.sr-header *::after {
  border: none !important;
  outline: none !important;
  box-shadow: none;
  text-decoration: none !important;
}

/* Header Container */
.sr-header{ 
  display: flex !important; 
  align-items: center !important; 
  justify-content: space-between !important; 
  gap: 20px !important; 
  padding: 12px 40px !important; 
  background: linear-gradient(120deg, var(--sr-blue) 0%, #0066b3 100%) !important; 
  color: white !important; 
  box-shadow: 0 2px 8px rgba(0,75,141,0.15) !important; 
  height: var(--header-height) !important;
  position: relative !important;
  margin: 0 !important;
}

/* Brand Section */
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

/* Navigation Menu */
.header-nav{
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  justify-content: center;
  max-width: 700px;
}

.header-nav .nav-item{
  background: transparent;
  border: none;
  outline: none;
  color: rgba(255,255,255,0.9);
  padding: 6px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  height: 32px;
  position: relative;
}

.header-nav .nav-item:hover{
  background: rgba(255,255,255,0.12);
  color: white;
  transform: translateY(-1px);
}

.header-nav .nav-item.active{
  background: rgba(255,210,0,0.2);
  color: white;
  font-weight: 600;
  animation: navItemActive 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.header-nav .nav-item.active:after{
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 2px;
  background: var(--sr-accent);
  border-radius: 2px;
  animation: underlineExpand 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes navItemActive {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes underlineExpand {
  from {
    width: 0%;
    opacity: 0;
  }
  to {
    width: 60%;
    opacity: 1;
  }
}
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

/* Search Section */
.sr-header .header-center{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-shrink: 0;
}

.search-container{
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-toggle{
  background: rgba(255,255,255,0.1);
  border: none;
  outline: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}

.search-toggle:hover{
  background: rgba(255,255,255,0.15);
  transform: scale(1.1) rotate(90deg);
}

.search-toggle:active{
  transform: scale(0.95) rotate(90deg);
}

.search-input{
  padding: 6px 14px;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 20px;
  background: rgba(255,255,255,0.1);
  color: white;
  font-size: 13px;
  width: 0;
  height: 32px;
  outline: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: translateX(20px);
  pointer-events: none;
}

.search-input.visible{
  width: 250px;
  opacity: 1;
  transform: translateX(0);
  pointer-events: auto;
  animation: searchExpand 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes searchExpand {
  0% {
    width: 0;
    opacity: 0;
    transform: translateX(20px) scale(0.8);
  }
  60% {
    width: 270px;
    transform: translateX(-5px) scale(1.02);
  }
  100% {
    width: 250px;
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

.search-input::placeholder{
  color: rgba(255,255,255,0.6);
}

.search-input:focus{
  background: rgba(255,255,255,0.15);
  border-color: rgba(255,255,255,0.4);
  width: 280px;
  box-shadow: 0 0 0 3px rgba(255,255,255,0.1);
}

/* Actions Section - Clean reset */
.sr-header .actions *{
  margin: 0;
  padding: 0;
}

.sr-header .actions{ 
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;
}

/* All action buttons base style */
.sr-header .action-btn{
  background: rgba(255,255,255,0.1);
  color: white;
  font-family: inherit;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  flex-shrink: 0;
}

.sr-header .action-btn:hover{
  background: rgba(255,255,255,0.15);
  transform: scale(1.05);
}

.sr-header .action-btn svg{
  flex-shrink: 0;
}

/* Badge */
.sr-header .action-btn .badge{
  position: absolute;
  top: -3px;
  right: -3px;
  background: var(--sr-accent);
  color: #004b8d;
  font-weight: 700;
  font-size: 10px;
  padding: 3px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
  line-height: 1;
}

/* Profile Button */
.sr-header .profile-btn{
  width: auto;
  padding: 4px 16px 4px 4px;
  border-radius: 18px;
  gap: 10px;
}

.sr-header .profile-btn .avatar{
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
  background: rgba(255,255,255,0.2);
  flex-shrink: 0;
}

.sr-header .profile-btn .user-name{
  font-weight: 600;
  font-size: 14px;
  color: white;
  white-space: nowrap;
  line-height: 1;
}

/* Login Button */
.sr-header .login-btn{
  background: var(--sr-accent);
  color: var(--sr-blue);
  width: auto;
  padding: 0 24px;
  border-radius: 18px;
  font-weight: 600;
}

.sr-header .login-btn:hover{
  transform: translateY(-1px);
}

/* Responsive */
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

let injected = false;
export default function injectHeaderStyles(){
  // Force remove and re-inject
  injected = false;
  
  const oldStyle = document.querySelector('style[data-styles="shared-header"]');
  if (oldStyle) {
    oldStyle.remove();
  }
  
  if (injected) return;
  injected = true;
  
  const el = document.createElement('style');
  el.setAttribute('data-styles','shared-header');
  el.innerHTML = css;
  document.head.appendChild(el);
  
  console.log('Header styles injected');
}
