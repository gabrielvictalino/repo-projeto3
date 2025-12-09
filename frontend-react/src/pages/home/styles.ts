const css = `
:root{
  --sr-blue: #004b8d;
  --sr-accent: #ffd200;
  --sr-teal: #00a99d;
  --sr-bg: #f6f9fc;
  --sr-surface: #ffffff;
  --sr-text: #1f2937;
  --sr-text-secondary: #6b7280;
  --sr-border: #e6eef8;
}

[data-theme="dark"]{
  --sr-blue: #3b82f6;
  --sr-accent: #fbbf24;
  --sr-teal: #14b8a6;
  --sr-bg: #1a1a1a;
  --sr-surface: #2a2a2a;
  --sr-text: #e5e5e5;
  --sr-text-secondary: #a3a3a3;
  --sr-border: #404040;
}

.home-page {
  max-width: 100%;
  margin: 0;
  padding: 0;
  background: var(--sr-bg);
}

/* Hero Carousel */
.hero-carousel {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  margin-bottom: 40px;
}

.carousel-slides {
  position: relative;
  width: 100%;
  height: 100%;
}

.carousel-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  background-size: cover;
  background-position: center;
}

.carousel-slide.active {
  opacity: 1;
}

.carousel-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6));
}

.carousel-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 20px;
  z-index: 1;
}

.carousel-content h1 {
  font-size: 48px;
  font-weight: 700;
  margin: 0 0 16px 0;
  text-shadow: 0 2px 12px rgba(0,0,0,0.5);
}

.carousel-content p {
  font-size: 20px;
  margin: 0;
  text-shadow: 0 2px 8px rgba(0,0,0,0.5);
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.3);
  border: none;
  color: white;
  font-size: 48px;
  width: 60px;
  height: 60px;
  cursor: pointer;
  z-index: 2;
  transition: background 0.3s;
  backdrop-filter: blur(4px);
}

.carousel-btn:hover:not(:disabled) {
  background: rgba(255,255,255,0.5);
}

.carousel-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.carousel-btn.prev {
  left: 20px;
}

.carousel-btn.next {
  right: 20px;
}

.carousel-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 2;
}

.carousel-indicators .indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  border: none;
  cursor: pointer;
  transition: background 0.3s;
  padding: 0;
}

.carousel-indicators .indicator.active {
  background: white;
}

/* Pesquisa Section */
.pesquisa-section {
  max-width: 1200px;
  margin: 0 auto 60px;
  padding: 0 20px;
}

.pesquisa-content {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 40px;
  align-items: start;
}

.pesquisa-image {
  width: 100%;
  height: 100%;
}

.pesquisa-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

[data-theme="dark"] .pesquisa-image img {
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
}

.pesquisa-text {
  background: var(--sr-surface);
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

[data-theme="dark"] .pesquisa-text {
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

.pesquisa-text h2 {
  font-size: 28px;
  font-weight: 700;
  color: var(--sr-blue);
  margin: 0 0 16px 0;
}

.pesquisa-text p {
  font-size: 14px;
  line-height: 1.6;
  color: var(--sr-text);
  margin: 0 0 16px 0;
}

.pesquisa-text h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--sr-text);
  margin: 24px 0 12px 0;
}

.pesquisa-text ul {
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
}

.pesquisa-text ul li {
  font-size: 14px;
  line-height: 1.6;
  color: var(--sr-text);
  margin-bottom: 8px;
  padding-left: 24px;
  position: relative;
}

.pesquisa-text ul li:before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--sr-blue);
  font-weight: 700;
}

.btn-participar {
  display: inline-block;
  background: var(--sr-blue);
  color: white;
  padding: 12px 32px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0,75,141,0.2);
}

.btn-participar:hover {
  background: #003d73;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,75,141,0.3);
}

[data-theme="dark"] .btn-participar {
  background: #4a9eff;
  color: white;
}

[data-theme="dark"] .btn-participar:hover {
  background: #6bb0ff;
}

/* Oportunidades Section */
.oportunidades-section {
  max-width: 1200px;
  margin: 0 auto 60px;
  padding: 0 20px;
}

.oportunidades-section h2 {
  font-size: 28px;
  font-weight: 700;
  color: var(--sr-text);
  margin: 0 0 24px 0;
}

.oportunidades-carousel {
  position: relative;
  padding: 0 60px;
}

.oportunidades-track-container {
  overflow: hidden;
}

.oportunidades-track {
  display: flex;
  gap: 20px;
  transition: transform 0.4s ease;
}

.oportunidade-card {
  flex: 0 0 calc(33.333% - 14px);
  background: var(--sr-surface);
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  color: var(--sr-text);
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: all 0.3s;
}

[data-theme="dark"] .oportunidade-card {
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

.oportunidade-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.12);
}

[data-theme="dark"] .oportunidade-card:hover {
  box-shadow: 0 8px 16px rgba(0,0,0,0.5);
}

.oportunidade-image {
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
}

.oportunidade-content {
  padding: 20px;
}

.oportunidade-content h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--sr-blue);
  margin: 0 0 8px 0;
}

.oportunidade-content p {
  font-size: 14px;
  line-height: 1.5;
  color: var(--sr-text-secondary);
  margin: 0;
}

.oportunidades-carousel .carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  font-size: 32px;
  border-radius: 50%;
}

.oportunidades-carousel .carousel-btn.prev {
  left: 0;
}

.oportunidades-carousel .carousel-btn.next {
  right: 0;
}

.oportunidades-carousel .carousel-indicators {
  position: static;
  transform: none;
  margin-top: 24px;
  justify-content: center;
}

@media (max-width: 768px) {
  .hero-carousel {
    height: 400px;
  }

  .carousel-content h1 {
    font-size: 32px;
  }

  .carousel-content p {
    font-size: 16px;
  }

  .pesquisa-content {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .pesquisa-image {
    height: 300px;
  }

  .oportunidade-card {
    flex: 0 0 100%;
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
