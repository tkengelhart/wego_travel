import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// CUSTOM COMPONENTS


function TripPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const fetchTrip = (event) => {

  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>
            The WeGo travel app was born out of a need to organize travel plans with two other families and in preparation for an upcoming vacation.  Attempting to get everyone together to go through details of the itinerary and to talk about what each family’s wants for the trip were,  proved to be really difficult.  Instead of using shared notes, group texts and emails, I wanted to create an app that larger groups can utilize to manage their itineraries and more importantly share details with each other.  This app will be a central place where travelers can add activity options and view their created itineraries and then share that information with the rest of the group.

          </p>

        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;