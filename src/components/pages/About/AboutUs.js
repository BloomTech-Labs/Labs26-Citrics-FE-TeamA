import React from 'react';
import '../../../components/common/styles/AboutUs.scss';

export default function AboutUs() {
  return (
    <div className="about-us-head">
      <div className="about-us-header">
        <div className="about-us-title-div">
          <h1 className="about-us-title-H1">Meet the Team</h1>
        </div>
      </div>
      <section className="about-us-section">
        <div className="section-container">
          <div className="about-us-team-div">
            <h2 id="managers" className="team-name">
              Management
            </h2>
            <span>Team</span>
          </div>
          <div className="card-container">
            <div className="card">
              <div className="member-info">
                <div className="member-pic">
                  <img
                    className="member-photo"
                    alt="default pic"
                    src="https://i.ibb.co/8zttxTG/vlad-profile-pic.png"
                  />
                </div>
                <h3>Vladislav Mogilevskiy</h3>
                <p className="member-role">Associate Project Lead</p>
                <div className="member-social">
                  <a
                    href="https://github.com/vladmog"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-github-square fa-3x" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/vladmog/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin fa-3x" />
                  </a>
                </div>
                <p className="member-bio">
                  Vladislav Mogilevskiy is a full stack web developer,
                  cross-functional Agile-development tech lead, and skilled
                  steel fabricator. I build web applications using React +
                  Express + Node.js as my primary stack.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="member-info">
                <div className="member-pic">
                  <img
                    className="member-photo"
                    alt="default pic"
                    src="https://i.ibb.co/KDCZn2d/sean-antosiak-profile-pic.jpg"
                  />
                </div>
                <h3>Sean Antosiak</h3>
                <p className="member-role">Technical Project Lead</p>
                <div className="member-social">
                  <a
                    href="https://github.com/Seanantosiak"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-github-square fa-3x" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/Seanantosiak"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin fa-3x" />
                  </a>
                </div>
                <p className="member-bio">
                  Sean Antosiak is a data scientist with an interest in using
                  data wrangling and feature engineering to get as much out of a
                  dataset as possible. The main tools he is currently working
                  with are Python, NumPy, Pandas, and scikit-learn.
                </p>
              </div>
            </div>
          </div>
          <div className="about-us-team-div">
            <h2 id="front-end" className="team-name">
              Front-end Development
            </h2>
            <span>Team</span>
          </div>
          <div className="card-container">
            <div className="card">
              <div className="member-info">
                <div className="member-pic">
                  <img
                    className="member-photo"
                    alt="default pic"
                    src="https://i.ibb.co/QcQs8Ch/michael-perez-profile-pic.jpg"
                  />
                </div>
                <h3>Michael Perez</h3>
                <p className="member-role">Front-end Engineer</p>
                <div className="member-social">
                  <a
                    href="https://github.com/Perezented"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-github-square fa-3x" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/perezenting-michael/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin fa-3x" />
                  </a>
                </div>
                <p className="member-bio">
                  Michael Perez is from Oklahoma. Previously, Michael worked at
                  Walgreens as a shift leader and p/t pharmacy technician. Upon
                  hearing about a great opportunity, Michael joined Lambda
                  Schools to develop better computer skills. Now Michael is
                  proficient in Full Stack Web Engineering, honing his skills on
                  Python, React.js, and Node.js/Express.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="member-info">
                <div className="member-pic">
                  <img
                    className="member-photo"
                    alt="default pic"
                    src="https://i.ibb.co/jwYt5H6/profpic.jpg"
                  />
                </div>
                <h3>Toricruz Mendiola</h3>
                <p className="member-role">Front-end Engineer</p>
                <div className="member-social">
                  <a
                    href="https://github.com/mtoricruz"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-github-square fa-3x" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/toricruz-mendiola"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin fa-3x" />
                  </a>
                </div>
                <p className="member-bio">
                  Toricruz Mendiola is a problem-solver enthusiast that is
                  looking to make a difference with the code he writes. He is
                  energized by being in environments where his contributions
                  will create an impact on someone's life. As a software
                  engineer, he is looking to be a part of organizations that are
                  making a difference in the world.
                </p>
              </div>
            </div>
          </div>
          <div className="about-us-team-div">
            <h2 id="data-science" className="team-name">
              Data Science
            </h2>
            <span>Team</span>
          </div>
          <div className="card-container">
            <div className="card">
              <div className="member-info">
                <div className="member-pic">
                  <img
                    className="member-photo"
                    alt="default pic"
                    src="https://i.ibb.co/fHZJH5c/aaron-watkins-profile-pic.jpg"
                  />
                </div>
                <h3>Aaron Watkins</h3>
                <p className="member-role">Data Science Engineer</p>
                <div className="member-social">
                  <a
                    href="https://github.com/ekselan"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-github-square fa-3x" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/aaron-watkins-jr/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin fa-3x" />
                  </a>
                </div>
                <p className="member-bio">
                  Aaron Watkins is a data scientist with a passion for data and
                  software engineering, machine learning, and natural language
                  processing. He is a fantasy sports enthusiast, cinema lover,
                  UMD alum.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="member-info">
                <div className="member-pic">
                  <img
                    className="member-photo"
                    alt="default pic"
                    src="https://i.ibb.co/YQ1zgbV/samuel-swank-profile-pic.jpg"
                  />
                </div>
                <h3>Samuel Swank</h3>
                <p className="member-role">Data Science Engineer</p>
                <div className="member-social">
                  <a
                    href="https://github.com/shengjiyang"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-github-square fa-3x" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/samuel-swank/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin fa-3x" />
                  </a>
                </div>
                <p className="member-bio">
                  Samuel Swank is a Data Scientist with a background in
                  econometrics currently attending Lambda School. Samuel is
                  proficient in Python and its Data Science Libraries, NumPy,
                  Pandas, MatplotLib, scikit-learn, TensorFlow, etc. Samuel also
                  lived in Taiwan for 2 years and speaks Mandarin at a level
                  that others describe as fluent.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="member-info">
                <div className="member-pic">
                  <img
                    className="member-photo"
                    alt="default pic"
                    src="https://i.ibb.co/NTGbxMD/kenneth-barrett-profile-pic.jpg"
                  />
                </div>
                <h3>Kenneth Barrett</h3>
                <p className="member-role">Data Science Engineer</p>
                <div className="member-social">
                  <a
                    href="https://github.com/KennethTBarrett"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-github-square fa-3x" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/kbarrett96/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin fa-3x" />
                  </a>
                </div>
                <p className="member-bio">
                  Kenneth Barrett is a Data Scientist located in the Houston
                  Greater Area with a passion for analytics and machine
                  learning. He is passionate about human progress in science,
                  technology, and society. Always happy to contribute in helping
                  others.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="member-info">
                <div className="member-pic">
                  <img
                    className="member-photo"
                    alt="default pic"
                    src="https://i.ibb.co/XYM5zdw/travis-cain-profile-pic.jpg"
                  />
                </div>
                <h3>Travis Cain</h3>
                <p className="member-role">Data Science Engineer</p>
                <div className="member-social">
                  <a
                    href="https://github.com/TravisJRCain"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-github-square fa-3x" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/travisc-/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin fa-3x" />
                  </a>
                </div>
                <p className="member-bio">
                  Data Scientist with a passion for data analytics, data
                  prediction and sports. Enjoy problem solving and working with
                  others.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
