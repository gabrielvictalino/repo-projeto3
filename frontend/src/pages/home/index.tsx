import React, { useState, useEffect } from 'react';
import injectHomeStyles from './styles';

injectHomeStyles();

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentOportunidadeSlide, setCurrentOportunidadeSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Participe da Nossa Pesquisa!',
      description: 'Sua opinião é muito importante! Ajude-nos a entender melhor suas necessidades e expectativas.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=500&fit=crop'
    },
    {
      id: 2,
      title: 'Capacitação Empresarial',
      description: 'Desenvolva suas habilidades de gestão com nossos cursos especializados.',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=500&fit=crop'
    },
    {
      id: 3,
      title: 'Consultoria Gratuita',
      description: 'Agende uma consultoria gratuita para o seu negócio crescer.',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=500&fit=crop'
    }
  ];

  const oportunidades = [
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
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextOportunidadeSlide = () => {
    const maxSlide = Math.max(0, oportunidades.length - 3);
    setCurrentOportunidadeSlide((prev) => Math.min(prev + 1, maxSlide));
  };

  const prevOportunidadeSlide = () => {
    setCurrentOportunidadeSlide((prev) => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home-page">
      {/* Hero Carousel */}
      <div className="hero-carousel">
        <button className="carousel-btn prev" onClick={prevSlide} aria-label="Anterior">
          ‹
        </button>
        <div className="carousel-slides">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="carousel-overlay" />
              <div className="carousel-content">
                <h1>{slide.title}</h1>
                <p>{slide.description}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-btn next" onClick={nextSlide} aria-label="Próximo">
          ›
        </button>
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Pesquisa Section */}
      <section className="pesquisa-section">
        <div className="pesquisa-content">
          <div className="pesquisa-image">
            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop" alt="Pesquisa" />
          </div>
          <div className="pesquisa-text">
            <h2>Participe da Nossa Pesquisa!</h2>
            <p>
              <strong>Sua opinião é muito importante!</strong><br/>
              A sua voz é fundamental para que possamos continuar 
              oferecendo os melhores serviços e soluções para o seu negócio. 
              Participe da nossa pesquisa e nos ajude a entender melhor suas 
              necessidades e expectativas.
            </p>
            <p>
              Levará apenas 5-10 min do seu precioso tempo e NÃO da 
              nossa parte é uma promessa de manter o contato pela 
              empresa e estar atentos aos feedbacks positivos/negativos, 
              procurando sempre atingir e superar as suas expectativas.
            </p>
            <h3>Por que participar?</h3>
            <ul>
              <li>Ajude-nos a entender o perfil e porte da sua empresa</li>
              <li>Você contribui diretamente para o desenvolvimento 
              do nosso formulário e aperfeiçoamento dentro do 
              mercado do Sudeste Brasileiro</li>
              <li>Queremos saber quais são suas necessidades e 
              expectativas exclusivas, com temas atuais, ferramentas 
              essenciais de controle e estatísticas dentro da 
              sua organização</li>
              <li>Oferecemos conteúdo personalizado, recursos únicos 
              para você, seu setor e seus colaboradores para toda a comunidade 
              de interessados</li>
            </ul>
            <a href="/responder" className="btn-participar">Participar da Pesquisa</a>
          </div>
        </div>
      </section>

      {/* Oportunidades Section */}
      <section className="oportunidades-section">
        <h2>Oportunidades para Você</h2>
        <div className="oportunidades-carousel">
          <button 
            className="carousel-btn prev" 
            onClick={prevOportunidadeSlide}
            disabled={currentOportunidadeSlide === 0}
            aria-label="Anterior"
          >
            ‹
          </button>
          <div className="oportunidades-track-container">
            <div 
              className="oportunidades-track"
              style={{ transform: `translateX(-${currentOportunidadeSlide * 33.333}%)` }}
            >
              {oportunidades.map(op => (
                <a 
                  key={op.id} 
                  href={op.link}
                  className="oportunidade-card"
                  target={op.external ? '_blank' : '_self'}
                  rel={op.external ? 'noopener noreferrer' : undefined}
                >
                  <div className="oportunidade-image" style={{ backgroundImage: `url(${op.image})` }} />
                  <div className="oportunidade-content">
                    <h3>{op.title}</h3>
                    <p>{op.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <button 
            className="carousel-btn next" 
            onClick={nextOportunidadeSlide}
            disabled={currentOportunidadeSlide >= oportunidades.length - 3}
            aria-label="Próximo"
          >
            ›
          </button>
          <div className="carousel-indicators">
            {Array.from({ length: Math.max(1, oportunidades.length - 2) }).map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentOportunidadeSlide ? 'active' : ''}`}
                onClick={() => setCurrentOportunidadeSlide(index)}
                aria-label={`Ir para grupo ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
