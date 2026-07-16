import React from 'react';

const About = () => {
  return (
    <div className="page-content">
      <div className="container">
        <div className="about-section">
          <h1 className="page-title">About Kartey</h1>
          
          <div className="about-content">
            <div className="about-block">
              <h2>A House of Inherited Taste</h2>
              <p>
                Kartey is a real name with real roots. A Ga-Adangme name from coastal Ghana, 
                carried into the present. It stands for a way of making things — considered, 
                restrained, and quietly rooted.
              </p>
            </div>

            <div className="about-block">
              <h2>What We Do</h2>
              <p>
                We make and curate across categories — image, scent, and what follows. 
                What links them is not the category but the standard. A Kartey thing is 
                considered. Whatever it is — a poster, a fragrance, a future product — 
                it carries the same judgment.
              </p>
            </div>

            <div className="about-block">
              <h2>Our Beliefs</h2>
              <div className="beliefs-grid">
                <div className="belief-card">
                  <h3>Restraint</h3>
                  <p>Less, but better. We would rather make one thing well than ten things noisily.</p>
                </div>
                <div className="belief-card">
                  <h3>Inheritance</h3>
                  <p>We carry where we come from. We do not decorate with heritage. We are heritage.</p>
                </div>
                <div className="belief-card">
                  <h3>Quiet</h3>
                  <p>We never shout. The work earns its own attention by being good.</p>
                </div>
                <div className="belief-card">
                  <h3>Coherence</h3>
                  <p>One sensibility, everywhere. A Kartey product feels like a Kartey product.</p>
                </div>
                <div className="belief-card">
                  <h3>Patience</h3>
                  <p>We move at the pace the work needs. Things ship when they are ready.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;