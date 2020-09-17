import React from 'react';
import '../../../components/common/styles/AboutUs.scss';

export default function AboutUs() {
  return (
    <div className="about-us">
      <div className="about-us-header">
        <h1 className="about-us-title">Meet the Team</h1>
      </div>
      <section className="about-us-section">
        <div className="section-container">
          <div className="about-us-div">
            <h2 id="managers" className="team-name">
              Management
            </h2>
            <span>Team</span>
          </div>
          <div className="card-container">
            <div className="card">
              <div className="member-info"></div>
            </div>
            <div className="card">
              <div className="member-info"></div>
            </div>
            <div className="card">
              <div className="member-info"></div>
            </div>
            <div className="card">
              <div className="member-info"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
