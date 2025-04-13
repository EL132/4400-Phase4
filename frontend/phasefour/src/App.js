import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// components 
import Homepage from './pages/homepage';

// procs
import AddAirplane from './pages/procedures/addAirplane';
import AddAirport from './pages/procedures/addAirport';
import AddPerson from './pages/procedures/addPerson';
import GrantOrRevoke from './pages/procedures/grantOrRevoke';
import OfferFlight from './pages/procedures/offerFlight';
import FlightLanding from './pages/procedures/flightLanding';
import FlightTakeoff from './pages/procedures/flightTakeoff';
import PassengersBoard from './pages/procedures/passengersBoard';
import PassengersDisembark from './pages/procedures/passengersDisembark';
import AssignPilot from './pages/procedures/assignPilot';
import RecycleCrew from './pages/procedures/recycleCrew';
import RetireFlight from './pages/procedures/retireFlight';
import SimulationCycle from './pages/procedures/simulationCycle';

// views 
import FlightsInAir from './pages/views/flightsInAir';
import PeopleInAir from './pages/views/peopleInAir';
import FlightsOnGround from './pages/views/flightsOnGround';
import PeopleOnGround from './pages/views/peopleOnGround';
import AlternativeAirports from './pages/views/alternativeAirports';
import RouteSummary from './pages/views/routeSummary';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />

        {/* all procs here  */}
        <Route path="/procedures/add-airplane" element={<AddAirplane />} />
        <Route path="/procedures/add-airport" element={<AddAirport />} />
        <Route path="/procedures/add-person" element={<AddPerson />} />
        <Route path="/procedures/grant-or-revoke" element={<GrantOrRevoke />} />
        <Route path="/procedures/offer-flight" element={<OfferFlight />} />
        <Route path="/procedures/flight-landing" element={<FlightLanding />} />
        <Route path="/procedures/flight-takeoff" element={<FlightTakeoff />} />
        <Route path="/procedures/passengers-board" element={<PassengersBoard />} />
        <Route path="/procedures/passengers-disembark" element={<PassengersDisembark />} />
        <Route path="/procedures/assign-pilot" element={<AssignPilot />} />
        <Route path="/procedures/recycle-crew" element={<RecycleCrew />} />
        <Route path="/procedures/retire-flight" element={<RetireFlight />} />
        <Route path="/procedures/simulation-cycle" element={<SimulationCycle />} />

        {/* all views here  */}
        <Route path="/views/flights-in-air" element={<FlightsInAir />} />
        <Route path="/views/flights-on-ground" element={<FlightsOnGround />} />
        <Route path="/views/people-in-air" element={<PeopleInAir />} />
        <Route path="/views/people-on-ground" element={<PeopleOnGround />} /> 
        <Route path="/views/alternative-airports" element={<AlternativeAirports />} />
        <Route path="/views/route_summary" element={<RouteSummary />} />
      </Routes>
    </Router>
  );
}

export default App;