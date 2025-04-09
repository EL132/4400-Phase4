import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// components 
import Homepage from './pages/homepage';

// procs
import AddAirplane from './pages/procedures/addAirplane';

// views 
import FlightsInAir from './pages/views/flightsInAir';
// import PeopleInAir from './pages/views/peopleInAir';
// import FlightsOnGround from './pages/views/flightsOnGround';
// import PeopleOnGround from './pages/views/peopleOnGround';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />

        {/* all procs here  */}
        <Route path="/procedures/add-airplane" element={<AddAirplane/>} />

        {/* all views here  */}
        <Route path="/views/flights-in-air" element={<FlightsInAir />} />
        {/* <Route path="/views/flights-on-ground" element={<FlightsOnGround />} /> */}
        {/* <Route path="/views/people-in-air" element={<PeopleInAir />} /> */}
        {/* <Route path="/views/people-on-ground" element={<PeopleOnGround />} />  */}
      </Routes>
    </Router>
  );
}

export default App;