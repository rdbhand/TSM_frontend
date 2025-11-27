import Nav from "./Nav";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import "../styles/Home.css";
function Testing(){
  return (<>

    <div id="home-page">
            <Nav />

            {/* HERO SECTION */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Welcome to Web Based Tiffin Service Management System</h1>
                    <p>Your one-stop platform for managing daily meals effortlessly.</p>
                    <Link to="/reglogin" className="hero-btn">Get Started</Link>
                </div>
            </section>

            {/* FEATURES */}
            <section className="features-section">
                <h2>⚙️ Features ⚙️</h2>
                <div className="feature-list">
                    <div className="feature-item">
                        <img src="../../images/feature_logo1.png" alt="logo1" />
                        <h3>Easy Management</h3>
                        <p>Manage providers, customers & meals in one place.</p>
                    </div>
                    <div className="feature-item">
                        <img src="../../images/feature_logo2.png" alt="logo2" />
                        <h3>Online Payments</h3>
                        <p>Secure & fast online transactions.</p>
                    </div>
                    <div className="feature-item">
                        <img src="../../images/feature_logo3.png" alt="logo3" />
                        <h3>Track Meals</h3>
                        <p>View time tables and daily meal schedules.</p>
                    </div>
                </div>
            </section>

            {/* WHY CHOOSE US */}
            <section className="why-section">
                <h2>Why Choose Us?</h2>
                <div className="why-container">
                    <div className="why-card">✨ Verified Tiffin Providers</div>
                    <div className="why-card">🕒 On-Time Delivery</div>
                    <div className="why-card">💳 Secure Payments</div>
                    <div className="why-card">🥗 Hygienic & Quality Meals</div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="how-section">
                <h2>How It Works</h2>
                <div className="how-steps">
                    <div className="step">
                        <span>1</span>
                        <p>Create your account</p>
                    </div>
                    <div className="step">
                        <span>2</span>
                        <p>Select your tiffin provider</p>
                    </div>
                    <div className="step">
                        <span>3</span>
                        <p>Choose a meal plan</p>
                    </div>
                    <div className="step">
                        <span>4</span>
                        <p>Enjoy daily fresh meals</p>
                    </div>
                </div>
            </section>

            {/* POPULAR PLANS */}
            <section className="plans-section">
                <h2>Popular Tiffin Plans</h2>
                <div className="plans-container">
                    <div className="plan-card">
                        <h3>Basic Veg Plan</h3>
                        <p>Simple and affordable daily meals.</p>
                    </div>
                    <div className="plan-card">
                        <h3>Premium Veg/Non-Veg</h3>
                        <p>Fresh premium dishes served daily.</p>
                    </div>
                    <div className="plan-card">
                        <h3>Weekly Special</h3>
                        <p>New dish every week with surprise combos.</p>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="testimonial-section">
                <h2>What Customers Say</h2>
                <div className="testimonial-container">
                    <div className="testimonial">
                        ⭐⭐⭐⭐⭐  
                        <p>“Amazing service, the food quality is excellent!”</p>
                        <h4>- Rahul</h4>
                    </div>
                    <div className="testimonial">
                        ⭐⭐⭐⭐⭐  
                        <p>“On-time delivery every day. Loved it.”</p>
                        <h4>- Priya</h4>
                    </div>
                    <div className="testimonial">
                        ⭐⭐⭐⭐⭐  
                        <p>“Best tiffin service platform I have used so far!”</p>
                        <h4>- Aman</h4>
                    </div>
                </div>
            </section>

            {/* ABOUT */}
            <section className="about-section">
                <h2>About Our System</h2>
                <p>
                    Our Tiffin Management System is designed to simplify the daily meal routine 
                    for both customers and providers. We ensure seamless communication, 
                    secure payments, quality meals, and a smooth user experience.
                </p>
            </section>

            {/* CONTACT CTA */}
            <section className="contact-section">
                <h2>Need Help?</h2>
                <p>Contact us anytime for support or queries.</p>
                <Link to="/contact" className="contact-btn">Contact Us</Link>
            </section>

            <Footer />
        </div>

  </>);
};
export default Testing;

