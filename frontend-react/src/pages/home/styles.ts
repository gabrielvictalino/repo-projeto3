const css = `
.home-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0;
}

.hero-section {
  background: linear-gradient(135deg, var(--sr-blue) 0%, var(--sr-teal) 100%);
  color: white;
  padding: 60px 40px;
  text-align: center;
  border-radius: 4px;
  margin-bottom: 48px;
  box-shadow: 0 2px 12px rgba(0, 75, 141, 0.08);
}

.hero-section h1 {
  font-size: 42px;
  font-weight: 700;
  margin: 0 0 12px 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.hero-subtitle {
  font-size: 18px;
  opacity: 0.95;
  margin: 0;
  font-weight: 400;
}

.ads-section {
  margin-bottom: 64px;
}

.ads-section h2 {
  font-size: 28px;
  color: var(--sr-blue);
  margin-bottom: 32px;
  text-align: center;
  font-weight: 600;
}

.ads-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
}

.ad-card {
  background: white;
  border: 1px solid rgba(0, 75, 141, 0.06);
  border-radius: 4px;
  overflow: hidden;
  transition: transform 0.22s cubic-bezier(0.2, 0.9, 0.3, 1), box-shadow 0.22s ease;
  box-shadow: 0 2px 8px rgba(16, 24, 40, 0.04);
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.ad-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 75, 141, 0.1);
}

.ad-image {
  width: 100%;
  height: 220px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.ad-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.3) 100%);
}

.ad-content {
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.ad-card h3 {
  font-size: 19px;
  color: var(--sr-blue);
  margin: 0 0 10px 0;
  font-weight: 600;
}

.ad-card p {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0 0 auto 0;
  flex: 1;
}

.ad-link-text {
  display: inline-block;
  color: var(--sr-teal);
  font-weight: 600;
  text-decoration: none;
  font-size: 14px;
  margin-top: 16px;
  transition: color 0.2s ease;
}

.ad-card:hover .ad-link-text {
  color: var(--sr-blue);
}

.cta-section {
  margin-bottom: 48px;
}

.cta-box {
  background: linear-gradient(135deg, rgba(0, 75, 141, 0.95), rgba(0, 169, 157, 0.9));
  color: white;
  padding: 56px 40px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 75, 141, 0.18);
}

.cta-box h2 {
  font-size: 32px;
  margin: 0 0 12px 0;
  font-weight: 700;
  color: white;
}

.cta-box p {
  font-size: 17px;
  margin: 0 0 28px 0;
  opacity: 0.95;
}

.btn-cta {
  display: inline-block;
  background: var(--sr-accent);
  color: var(--sr-blue);
  padding: 14px 36px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 700;
  font-size: 15px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 6px 20px rgba(255, 210, 0, 0.3);
}

.btn-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(255, 210, 0, 0.4);
}

@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 28px;
  }
  
  .hero-subtitle {
    font-size: 15px;
  }
  
  .ads-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-box h2 {
    font-size: 24px;
  }
  
  .ad-image {
    height: 180px;
  }
}
`;

let injected = false;
export default function injectHomeStyles() {
  if (injected) return;
  injected = true;
  const el = document.createElement('style');
  el.setAttribute('data-styles', 'home');
  el.innerHTML = css;
  document.head.appendChild(el);
}
