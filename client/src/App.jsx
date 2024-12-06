import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";
import BreathingGame from "./pages/BreathingGame";
//import TrackMood from "./pages/track-mood";

export default function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      

      <Routes>
        <Route path= "/breathinggame" element={<BreathingGame/>}/>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* <Route path="/track-mood" element={<TrackMood />} /> */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}
