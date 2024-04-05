import React from 'react'

const Biography = ({
  imageUrl
}) => {
  return (
    <>
    <div className="biography container">
      <div className="banner">
        <img src={imageUrl} alt="about" />
      </div>
      <div className="banner">
        <p>Biagrophy</p>
        <h3>Who We Are</h3>
        <p>BN Medical Institute is a leading medical institute in the country. We are committed to providing the best medical education to our students. We have a team of highly qualified doctors who are dedicated to providing the best medical care to our patients. Our mission is to provide quality medical education and healthcare services to our students and patients. We are dedicated to training the next generation of healthcare professionals and providing the best medical care to our patients. We are committed to excellence in education, research, and patient care.</p>
          <p>
            Our vision is to be a leader in medical education and healthcare services. We are committed to providing the best medical education to our students and the best medical care to our patients. We are dedicated to training the next generation of healthcare professionals and providing the best medical care to our patients. We are committed to excellence in education, research, and patient care.
          </p>
          <p>
            Our values are excellence, integrity, compassion, respect, and teamwork. We are committed to providing the best medical education to our students and the best medical care to our patients. We are dedicated to training the next generation of healthcare professionals and providing the best medical care to our patients. We are committed to excellence in education, research, and patient care.
          </p>
      </div>
      </div>
    
    </>
  )
}

export default Biography