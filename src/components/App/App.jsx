import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,

} from 'react-router-dom';

import { useDispatch } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

// import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../UnusedComponents/InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import TripPage from '../TripPage/TripPage';
import ActivityList from '../ActivityList/ActivityList';
import TripDetails from '../TripDetails/TripDetails';
import ActivityInfo from '../ActivityInfo/ActivityInfo';
import AddActivity from '../AddActivity/AddActivity';
import EditActivityInfo from '../EditActivityInfo/EditActivityInfo';
import ChooseItinerary from '../ChooseItinerary/ChooseItinerary';
import './App.css';
import "bootswatch/dist/minty/bootstrap.min.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInfoCircle, faEdit, faPlusSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import EditActivityTime from '../EditActivityTime/EditActivityTime';

library.add(faInfoCircle, faEdit, faPlusSquare, faTrashAlt);


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}


          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/trips"
          >
            <TripPage />
            {/* <TripForm /> */}
          </Route>
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/details/:tripId"
          >
            <TripDetails />
          </Route>
          <Route
            exact
            path="/activity"
          >
            <ActivityList />
          </Route>
          <Route path="/activity/:activityId">
            <ActivityInfo />
          </Route>
          <Route path='/add'><AddActivity /></Route>
          <Route path='/activity/:activityId'><ActivityInfo /></Route>
          <Route path='/additinerary'><ChooseItinerary /></Route>
          <Route path='/activityupdate'><EditActivityTime /></Route>
          <Route path='/edit'><EditActivityInfo /></Route>






          {/* <Route
            exact
            path="/edit"
          >
            <EditActivity />
          </Route> */}
          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LoginPage at /login
            exact
            path="/login"
            authRedirect="/trips"
          >
            <LoginPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows RegisterPage at "/registration"
            exact
            path="/registration"
            authRedirect="/trips"
          >
            <RegisterPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LandingPage at "/home"
            exact
            path="/home"
            authRedirect="/trips"
          >
            <LandingPage />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div >
    </Router >
  );
}

export default App;
