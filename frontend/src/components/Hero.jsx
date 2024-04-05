import React from 'react';

const Hero = ({ title, imageUrl }) => {
  return (
    <div className="hero container">
      <div className="banner">
        <h1>{title}</h1>
        <p>BN Medical Institute is a leading medical institute in the country. We are committed to providing the best medical education to our students. We have a team of highly qualified doctors who are dedicated to providing the best medical care to our patients.</p>
      </div>
      <div className="banner">
        <img src={imageUrl} alt="hero" className='animated-image' />
        <span>
          <img src="/Vector.png" alt="vector" />
        </span>
      </div>
    </div>
  );
}

export default Hero;
