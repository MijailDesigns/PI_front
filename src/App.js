import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar.jsx'
import CreateActivity from './components/CreateActivity/CreateActivity';
import CountryDetail from './components/Details/CountryDetail';
import Activities from './components/Activities/Activities';
import About from './components/About/About';

function App() {
  return (
    <div className="App">
      {/* <NavBar /> */}
      <Route exact path='/'>
        <LandingPage />
      </Route>
      <Route exact path={['/home', '/about','/createActivity/:id', '/activities', '/countryDetail/:id']}>
        <NavBar />
      </Route>
      <Route path='/home'>
        <Home />
      </Route>
      <Route path='/about'>
        <About />
      </Route>
      <Route path='/createActivity/:id'>
        <CreateActivity />
      </Route>
      {/* <Route path='/createActivity'>
        <CreateActivity />
      </Route> */}
      <Route path='/activities'>
        <Activities />
      </Route>
      <Route path='/countryDetail/:id'>
        <CountryDetail />
      </Route>
    </div>
  );
}

export default App;
