import React from 'react';
import '../../common/styles/StaticHomePage.scss';
export default function StaticHomePage() {
  return (
    <section className="information">
      <div>
        <i className="fas fa-server fa-5x"></i>
        <div>
          <h2>Data that Matters</h2>
          <p>
            Research a single city or compare multiple cities measuring
            different metrics like the average rent of a 1-bedroom, average
            climate, most popular job industry and more.
          </p>
        </div>
      </div>
      <div>
        <i className="fas fa-chart-area fa-5x"></i>{' '}
        <div>
          <h2>Visualize Comparisons</h2>
          <p>
            We take the metrics that matter and display them in graphs that make
            it easy to understand the key differences between each city.{' '}
          </p>
        </div>
      </div>
      <div>
        <i className="far fa-calendar-plus fa-5x"></i>
        <div>
          <h2>Look Ahead</h2>
          <p>
            Based on historic city data, we layout predictions for you of what
            the city wide metrics will look like, up to 2 years in advance.{' '}
          </p>
        </div>
      </div>
    </section>
  );
}
