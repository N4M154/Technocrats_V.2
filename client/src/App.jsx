// App.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import About from "./pages/About";
import Analytics from "./pages/Analytics"; // Import Analytics page
import BreathingGame from "./pages/BreathingGame";
import Community from "./pages/CommunityPage";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/community" element={<Community />} />
        <Route path="/breathinggame" element={<BreathingGame />} />
        
        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Analytics Route */}
        <Route path="/analytics" element={<Analytics />} /> {/* Route for Analytics */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
