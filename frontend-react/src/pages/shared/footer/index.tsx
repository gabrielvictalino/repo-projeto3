import React from 'react';
import injectFooterStyles from './styles';

injectFooterStyles();

export default function Footer(){
  return (
    <footer className="sr-footer">
      <div className="inner">
        <div>© {new Date().getFullYear()} SEBRAE - Questionários</div>
        <div className="links"><a href="#">Ajuda</a><a href="#">Privacidade</a><a href="#">Sobre</a></div>
      </div>
    </footer>
  );
}
