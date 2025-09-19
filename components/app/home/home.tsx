
// import React from 'react';
import './home.css';


export default function Home(){
  return (
    <div className="homepage">
      <div className="hero-section">

        <div className="egg-container">
        <img
          src="/images/hero/logo-hero.png"
          alt="Main visual"
          className="hero-image"
        />
        <p className="egg-text">The leaf above was created using the Flux-Dev model with the script found <a href="/egg" target="blank">here.</a></p>
        </div>
      </div>
    </div>
  );
};
