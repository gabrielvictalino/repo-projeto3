import React, { useState, useEffect } from 'react';
import injectHomeStyles from './styles';

injectHomeStyles();

export default function HomePage() {
  const [ads] = useState([
    {
      id: '1',
      title: 'Capacitação Empresarial',
      description: 'Desenvolva suas habilidades de gestão com nossos cursos especializados.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
      link: 'https://sebrae.com.br/sites/PortalSebrae/cursosonline',
      external: true
    },
    {
      id: '2',
      title: 'Consultoria Gratuita',
      description: 'Agende uma consultoria gratuita para o seu negócio.',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop',
      link: 'https://sebrae.com.br/sites/PortalSebrae/sebraeaz/consultorias',
      external: true
    },
    {
      id: '3',
      title: 'Eventos e Networking',
      description: 'Participe dos nossos eventos e amplie sua rede de contatos.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
      link: 'https://sebrae.com.br/sites/PortalSebrae/canais_adicionais/eventos',
      external: true
    },
    {
      id: '4',
      title: 'Crédito para MEI',
      description: 'Linhas de crédito especiais para microempreendedores.',
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop',
      link: '/responder',
      external: false
    },
    {
      id: '5',
      title: 'Inovação e Tecnologia',
      description: 'Transforme seu negócio com soluções digitais.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
      link: 'https://sebrae.com.br/sites/PortalSebrae/inovacao',
      external: true
    },
    {
      id: '6',
      title: 'Marketing Digital',
      description: 'Aprenda a promover seu negócio nas redes sociais.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      link: '/responder',
      external: false
    }
  ]);

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Bem-vindo ao Portal SEBRAE</h1>
        <p className="hero-subtitle">Sua jornada de sucesso começa aqui</p>
      </div>

      <section className="ads-section">
        <h2>Oportunidades para Você</h2>
        <div className="ads-grid">
          {ads.map(ad => (
            <a 
              key={ad.id} 
              href={ad.link}
              className="ad-card"
              target={ad.external ? '_blank' : '_self'}
              rel={ad.external ? 'noopener noreferrer' : undefined}
            >
              <div className="ad-image" style={{ backgroundImage: `url(${ad.image})` }}>
                <div className="ad-overlay" />
              </div>
              <div className="ad-content">
                <h3>{ad.title}</h3>
                <p>{ad.description}</p>
                <span className="ad-link-text">
                  {ad.external ? 'Acessar site →' : 'Ver mais →'}
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-box">
          <h2>Responda nossos questionários</h2>
          <p>Ajude-nos a melhorar nossos serviços compartilhando sua opinião.</p>
          <a href="/responder" className="btn-cta">Ir para Questionários</a>
        </div>
      </section>
    </div>
  );
}
