const css = `
.main-root{ padding:28px; }
.main-landing{ max-width:900px; background:var(--sr-surface); padding:20px; border-radius:8px }
.main-landing h1{ color:var(--sr-blue) }
.actions{ margin-top:12px }
.primary{ background:var(--sr-blue); color:white; border:none; padding:10px 14px; border-radius:6px; cursor:pointer }
`;

let injected = false;
export default function injectMainStyles(){
  if (injected) return;
  injected = true;
  const el = document.createElement('style');
  el.setAttribute('data-styles','main');
  el.innerHTML = css;
  document.head.appendChild(el);
}
