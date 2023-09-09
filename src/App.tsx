import SignUp from './pages/SignUp/SignUp.pages';
import Login from './pages/Login/Login.pages';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SetupBikeDetails from './pages/SetupBikeDetails';
import SetupDailyCommute from './pages/SetupDailyCommute';
import Navbar from './assets';
import HealthBar from './pages/HealthBar';
import CarePlan from './pages/CarePlan';
import Cart from './pages/Cart';
import Cases from './pages/Technician/Dashboard/Cases';
import DelivaryDetails from './pages/DelivaryDetails';
import MyBike from './pages/MyBike';
import SetUpExpertCall from './pages/SetUpExpertCall';
import SetupRecreationalCommute from './pages/SetupRecreationalCommute';
import SetupDailyRoute from './pages/SetupDailyRoute';
import TechnicianProfile from './pages/Technician/Dashboard/Profile';
import Dashboard from './pages/Technician/Dashboard';
import SetUpExpertise from './pages/Technician/Setup/setUpExpertise';
import SetUpWorkingSchedule from './pages/Technician/Setup/setUpWorkingSchedule';
import TechnicianSignUp from './pages/Technician/Sign Up';
import TechnicianSignIn from './pages/Technician/Sign In';
import SetUpContact from './pages/Technician/Setup/setUpContact';
import ThankYou from './pages/ThankYou';
import CyclistTabCases from './pages/CyclistTabCases';
import IndividualCyclistCase from './pages/IndividualCyclistCase';
import Agenda from './pages/Technician/Dashboard/Agenda';
import IndividualCase from './pages/Technician/Dashboard/Individual Case';
import CyclistProfile from './pages/CyclistProfile';
import Maintenance from './pages/Maintenance';
import Chat from './pages/Chat';
import TechnicianAccordian from './components/TechnicianAccordian';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route index path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/thankyou' element={<ThankYou></ThankYou>}></Route>

          <Route path='/setup-daily-route' element={<SetupDailyRoute />} />
          <Route path='/setup-bike-details' element={<SetupBikeDetails />} />
          <Route path='/setup-commute-details' element={<SetupDailyCommute />} />
          <Route path='/setup-recreation-details' element={<SetupRecreationalCommute />} />
        </Routes>
        <Routes>
          <Route element={<Navbar theme='secondary' />}>
            <Route path='/home' element={<Home />} />
            <Route path='/cyclist-profile' element={<CyclistProfile />} />
            <Route path='/bike-health' element={<HealthBar />} />
            <Route path='/delivery-details' element={<DelivaryDetails />} />
            <Route path='/expert-call' element={<SetUpExpertCall />} />
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/chat' element={<Chat />}></Route>
            <Route path='/cyclist-case' element={<CyclistTabCases />}></Route>
            <Route path='/individual-cyclist-case/:id' element={<IndividualCyclistCase />}></Route>
            <Route path='/maintenance/:id' element={<Maintenance />} />
          </Route>
        </Routes>
        <Routes>
          <Route element={<Navbar theme='third' />}>
            <Route path='/care-plan' element={<CarePlan />} />
            <Route path='/my-bike' element={<MyBike />} />
          </Route>
        </Routes>

        <Routes>
          <Route element={<Dashboard />}>
            <Route path='/agenda' element={<Agenda />} />
            <Route path='/cases' element={<Cases />} />
            <Route path='/profile' element={<TechnicianProfile />} />
            <Route path='/individual-case/:id' element={<IndividualCase />} />
          </Route>
        </Routes>

        <Routes>
          <Route path='/technician-signup' element={<TechnicianSignUp />} />
          <Route path='/technician-signin' element={<TechnicianSignIn />} />
          <Route path='/technician-setup-1' element={<SetUpContact />} />
          <Route path='/technician-setup-2' element={<SetUpExpertise />} />
          <Route path='/technician-setup-3' element={<SetUpWorkingSchedule />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
