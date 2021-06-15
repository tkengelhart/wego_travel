import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <>
      <div className="container">
        <div className="about-section">

          <p>The WeGo travel app was born out of a need to organize travel plans
            with two other families and in preparation for an upcoming vacation. Attempting
            to get everyone together to go through details of the itinerary and to talk about what
            each family’s wants for the trip were, proved to be really difficult. Instead of
            using shared notes, group texts and emails, I wanted to create an app that larger
            groups can utilize to manage their itineraries and more importantly share details
            with each other. This app will be a central place where travelers can add activity
            options and view their created itineraries and then share that information with the
            rest of the group.
          </p>
        </div>

      </div >
    </>
  );
}

export default AboutPage;
