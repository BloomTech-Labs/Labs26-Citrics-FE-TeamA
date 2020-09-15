import React from 'react';
import './styles/StaticHomePage.scss';
export default function StaticHomePage() {
  return (
    <section className="information">
      <div>
        <i class="fas fa-server fa-5x"></i>
        <div>
          <h2>Data that Matters</h2>
          <p>
            Research a single city or compare multiple cities measuring
            different metrics like average rent of 1-bedroom, average climate,
            most popular job industry and more.
          </p>
        </div>
      </div>
      <div>
        <i class="fas fa-chart-area fa-5x"></i>{' '}
        <div>
          <h2>Visualize Comparisons</h2>
          <p>
            We take the metrics that matter and display them in graphs that make
            it easy to understand the key differences between each city.{' '}
          </p>
        </div>
      </div>
      <div>
        <i class="far fa-calendar-plus fa-5x"></i>
        <div>
          <h2>Look Ahead</h2>
          <p>
            Based on historic city data, we layout predictions for you of what
            the cities metrics will look like up to 5 years ahead.{' '}
          </p>
        </div>
      </div>
    </section>
  );
}
