import Nav from './Nav';
import React from 'react';
import '../styles/About.css';

const About = () => {
  return (

    <>
    <Nav />
    <div className="about-container">
      <h1 className="about-heading">About Us</h1>
      <p className="about-text">
        Welcome to our Tiffin Service Management System! We are committed to providing
        fresh, healthy, and hygienic home-style meals to working professionals, students,
        and families. Our service is designed to help you manage your tiffin subscriptions,
        orders, and deliveries easily.
      </p>
      <p className="about-text">
        Our mission is to make nutritious meals accessible and affordable for everyone, while
        supporting local cooks and home chefs. Whether you need daily lunch or dinner, we offer
        flexible meal plans that suit your lifestyle.
      </p>
      <p className="about-text">
        Thank you for trusting our service. We look forward to serving you with quality food and care.
      </p>
    </div>
    </>
    
  );
};

export default About;
