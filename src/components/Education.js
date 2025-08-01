import React, { useEffect, useRef, useState } from 'react';
import { FaUniversity, FaSchool, FaUserGraduate, FaStar } from 'react-icons/fa';
import './Education.css';

const educationData = [
  {
    icon: <FaUniversity />,
    degree: "Bachelor's Degree",
    institution: "Kongu Engineering College, Erode",
    year: "2023-2027",
    percentage: 78.9
  },
  {
    icon: <FaSchool />,
    degree: "Higher Secondary Education",
    institution: "Sri Jayendra Saraswathi Swamigal Golden Jubilee Matriculation Higher Secondary School, Tirunelveli",
    year: "2023",
    percentage: 92
  },
  {
    icon: <FaUserGraduate />,
    degree: "SSLC",
    institution: "Sri Jayendra Saraswathi Swamigal Golden Jubilee Matriculation Higher Secondary School, Tirunelveli",
    year: "2021",
    percentage: 100
  },
];

const Education = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const educationRefs = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = educationRefs.current.indexOf(entry.target);
            if (index !== -1 && !visibleItems.includes(index)) {
              // Add a staggered delay for each item
              setTimeout(() => {
                setVisibleItems(prev => [...prev, index]);
              }, index * 300); // 300ms delay between each item
            }
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Start animation slightly before the element is fully visible
      }
    );

    // Observe all education items
    educationRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      educationRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [visibleItems]);

  // Function to convert percentage to star rating (1-5 stars)
  const getStarRating = (percentage) => {
    if (percentage >= 90) return 5;
    if (percentage >= 80) return 4;
    if (percentage >= 70) return 3;
    if (percentage >= 60) return 2;
    return 1;
  };

  // Function to render GTA-style stars
  const renderStars = (percentage) => {
    const starCount = getStarRating(percentage);
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`star ${i <= starCount ? 'filled' : 'empty'}`}
        />
      );
    }
    
    return stars;
  };

  return (
    <section id="education" className="education-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Education</h2>
        <div className="education-timeline">
          {educationData.map((edu, index) => (
            <div 
              key={index} 
              ref={(el) => educationRefs.current[index] = el}
              className={`education-item ${visibleItems.includes(index) ? 'visible' : 'hidden'}`}
            >
              <div className="education-icon">
                {edu.icon}
              </div>
              <div className="education-content">
                <h3>{edu.degree}</h3>
                <p className="institution">{edu.institution}</p>
                <p className="year">{edu.year}</p>
                <div className="star-rating">
                  <div className="stars-container">
                    {renderStars(edu.percentage)}
                  </div>
                  <div className="rating-info">
                    <span className="percentage-text">{edu.percentage}%</span>
                    <span className="rating-text">{getStarRating(edu.percentage)}/5 ★</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
